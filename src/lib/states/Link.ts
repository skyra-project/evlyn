import type { ICondition } from './conditions/ICondition';
import type { Node } from './Node';

export class Link<TSource, TDestination = unknown> {
	public readonly source: Node<TSource>;
	public readonly destination: Node<TDestination>;
	private readonly behavior: ICondition<TSource>;

	public constructor(source: Node<TSource>, destination: Node<TDestination>, behavior: ICondition<TSource>) {
		this.source = source;
		this.destination = destination;
		this.behavior = behavior;
	}

	public test(value: TSource) {
		return this.behavior.test(value) ? this.destination : null;
	}
}
