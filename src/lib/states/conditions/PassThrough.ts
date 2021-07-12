import type { ICondition } from './ICondition';

export const passThrough: ICondition<unknown> = {
	test() {
		return true;
	}
};
