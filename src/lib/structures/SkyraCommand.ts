import { mergeDefault } from '@sapphire/utilities';
import { PermissionResolvable, Permissions } from 'discord.js';
import { Command, CommandOptions, CommandStore, KlasaMessage } from 'klasa';

export abstract class EvlnCommand extends Command {
	public spam: boolean;
	public requiredGuildPermissions: Permissions;

	public constructor(store: CommandStore, file: string[], directory: string, options: EvlynCommandOptions = {}) {
		super(
			store,
			file,
			directory,
			mergeDefault<Partial<EvlynCommandOptions>, EvlynCommandOptions>(
				{
					spam: false,
					requiredGuildPermissions: 0
				},
				options
			) as EvlynCommandOptions
		);
		this.spam = options.spam!;
		this.requiredGuildPermissions = new Permissions(options.requiredGuildPermissions);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public run(message: KlasaMessage, _params: any[]): any {
		return message;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public inhibit(_message: KlasaMessage): Promise<boolean> | boolean {
		return false;
	}
}

export interface EvlynCommandOptions extends CommandOptions {
	spam?: boolean;
	requiredGuildPermissions?: PermissionResolvable;
}
