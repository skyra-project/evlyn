import { BasePiece, Awaited } from '@sapphire/framework';
import { EvlynClient } from '@lib/EvlynClient';

export abstract class Task extends BasePiece {
	public get client(): EvlynClient {
		return this.client;
	}

	public abstract run(...args: readonly unknown[]): Awaited<void>;
}
