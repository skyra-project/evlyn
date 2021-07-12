import type { IBehavior } from './IBehavior';

export const noOperation: IBehavior<unknown> = {
	run() {
		// No Operation
	}
};
