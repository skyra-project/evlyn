import { Stopwatch } from '@klasa/stopwatch';
import { Type } from '@klasa/type';
import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { clean } from '@utils/clean';
import { Message } from 'discord.js';
import { inspect } from 'util';

@ApplyOptions<CommandOptions>({
	aliases: ['ev'],
	description: 'commands:evalDescription',
	detailedDescription: 'commands:evalExtended',
	preconditions: ['OwnerOnly']
})
export default class ClientCommand extends Command {
	public async run(message: Message, args: Args) {
		const code = await args.pick('string');
		const { success, result, time, type } = await this.eval(message, code);

		return message.channel.send(
			[
				`**Success**: ${success ? 'Yes' : 'No'}`, //
				`**Output**:${codeBlock('js', result)}`,
				`**Type**:${codeBlock('ts', type)}`,
				time
			].join('\n')
		);

		/* Disabled until we have an i18next plugin */
		// return message.sendTranslated(success ? 'commands:evalSuccess' : 'commands:evalError', [
		// 	{
		// 		content: codeBlock('js', result),
		// 		type: codeBlock('ts', type),
		// 		time
		// 	}
		// ]);
	}

	// Eval the input
	private async eval(message: Message, code: string) {
		const stopwatch = new Stopwatch();
		let success: boolean | undefined = undefined;
		let syncTime: string | undefined = undefined;
		let asyncTime: string | undefined = undefined;
		let result: unknown | undefined = undefined;
		let thenable = false;
		let type: Type | undefined = undefined;
		try {
			// @ts-expect-error 6133
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const msg = message;
			// eslint-disable-next-line no-eval
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);
			if (isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}
			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();
			if (!type!) type = new Type(error);
			result = error;
			success = false;
		}

		stopwatch.stop();
		if (typeof result !== 'string') {
			result = result instanceof Error ? result.stack : inspect(result, { depth: 0 });
		}
		return { success, type: type!, time: this.formatTime(syncTime, asyncTime ?? ''), result: clean(result as string) };
	}

	private formatTime(syncTime: string, asyncTime: string) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	}
}
