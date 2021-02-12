import { Awaited, Piece } from '@sapphire/framework';

export abstract class Task extends Piece {
	public abstract run(...args: readonly unknown[]): Awaited<void>;
}
