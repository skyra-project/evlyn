import { PreConditions } from '#lib/types/constants';
import { clean } from '#utils/sanitizer/clean';
import { fetch, FetchMethods, FetchResultTypes } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command, CommandOptions } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { Message, MessageAttachment } from 'discord.js';
import { inspect } from 'util';

@ApplyOptions<CommandOptions>({
	aliases: ['ev'],
	description: 'Evaluates arbitrary Javascript. Reserved for bot owner.',
	detailedDescription: 'The eval command evaluates code as-in, any error thrown from it will be handled.',
	preconditions: [PreConditions.OwnerOnly]
})
export default class ClientCommand extends Command {
	public async run(message: Message, args: Args) {
		const code = await args.pick('string');
		const { success, result, time, type } = await this.eval(message, code);

		const out = success
			? `**Output**:${codeBlock('js', result)}\n**Type**:${codeBlock('ts', type)}\n${time}`
			: `**Error**:${codeBlock('js', result)}\n**Type**:${codeBlock('ts', type)}\n${time}`;

		return message.send(out.length > 2000 ? await this.getHaste(out).catch(() => new MessageAttachment(Buffer.from(out), 'output.txt')) : out);
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

	private async getHaste(result: string) {
		const { key } = (await fetch('https://hastebin.skyra.pw/documents', { method: FetchMethods.Post, body: result }, FetchResultTypes.JSON)) as {
			key: string;
		};
		return `https://hastebin.skyra.pw/${key}.js`;
	}
}
