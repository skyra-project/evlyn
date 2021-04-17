import { OWNERS } from '#root/config';
import { Precondition, PreconditionResult } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class ClientPrecondition extends Precondition {
	public run(message: Message): PreconditionResult {
		return OWNERS.includes(message.author.id) ? this.ok() : this.error({ context: { silent: true } });
	}
}
