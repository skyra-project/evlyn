import { envParseInteger } from '#lib/env';
import { Store } from '@sapphire/pieces';
import type { IBehavior } from './behaviors/IBehavior';
import { noOperation } from './behaviors/NoOperation';
import { Node } from './Node';

export class StateMachine {
	public readonly initial: Node<unknown> = this.create(noOperation);
	private current: Node<unknown> = this.initial;
	private timer: NodeJS.Timeout | null = null;

	public setCurrent<T>(node: Node<T>) {
		this.current = node;
		return this;
	}

	public create<T>(behavior: IBehavior<T>, parent: Node<T> | null = null) {
		return new Node<T>(behavior, parent);
	}

	public start() {
		if (this.timer) clearTimeout(this.timer);
		this.timer = setTimeout(this.handleCallback.bind(this), envParseInteger('STATE_MACHINE_TIMEOUT'));
	}

	public destroy() {
		if (this.timer) clearTimeout(this.timer);
	}

	private async run() {
		this.current = await this.current.run();
	}

	private async handleCallback() {
		try {
			await this.run();
		} catch (error) {
			Store.injectedContext.logger.error(error);
		} finally {
			this.timer?.refresh();
		}
	}
}
