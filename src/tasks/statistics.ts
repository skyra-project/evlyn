import { Task } from '#lib/structures/Task';
import { MessageFromServerAction } from '#lib/networking/websocket/types';
import { Time } from '#utils/constants';

export class ClientTask extends Task {
	// eslint-disable-next-line @typescript-eslint/no-invalid-this
	private _interval: NodeJS.Timer | null = this.create();

	public run(): void {
		// Send a ping message to all known clients
		for (const [clientName, client] of this.context.client.websocket.consumers) {
			this.context.client.logger.debug('Sending a ping message to: ', clientName);
			client.send({ action: MessageFromServerAction.Ping });
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public onLoad() {
		if (this.context.client.options.dev) {
			this.store.unload(this);
		} else {
			super.onLoad();
			if (!this._interval) this._interval = this.create();
		}
	}

	public onUnload() {
		if (this._interval) {
			this.context.client.clearInterval(this._interval);
			this._interval = null;
		}
	}

	private create(): NodeJS.Timer {
		this.run();
		return this.context.client.setInterval(() => {
			this.run();
		}, Time.Minute * 5);
	}
}
