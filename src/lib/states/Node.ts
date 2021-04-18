import type { IBehavior } from './behaviors/IBehavior';
import type { ICondition } from './conditions/ICondition';
import { Link } from './Link';

export class Node<T> {
	private readonly parent: Node<T> | null;
	private readonly links: Link<T, unknown>[] = [];
	private readonly behavior: IBehavior<T>;

	public constructor(behavior: IBehavior<T>, parent: Node<T> | null = null) {
		this.behavior = behavior;
		this.parent = parent;
	}

	public add<TDestination>(destination: Node<TDestination>, condition: ICondition<T>) {
		this.links.push(new Link(this, destination, condition));
		return this;
	}

	public async run(): Promise<Node<unknown>> {
		let next = this.parent ? await this.parent.run() : null;
		if (next !== null) return next;

		const value = await this.behavior.run();
		for (const link of this.links) {
			next = link.test(value);
			if (next !== null) return next;
		}

		return this;
	}
}
