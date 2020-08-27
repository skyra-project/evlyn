import { BasePiece, Awaited } from '@sapphire/framework';

export abstract class Task extends BasePiece {
	public abstract run(...args: readonly unknown[]): Awaited<void>;
}
