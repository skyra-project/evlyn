import type { Awaited } from '@sapphire/utilities';

export interface IBehavior<T> {
	run(): Awaited<T>;
}
