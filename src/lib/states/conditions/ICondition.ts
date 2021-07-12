export interface ICondition<T> {
	test(value: T): boolean;
}
