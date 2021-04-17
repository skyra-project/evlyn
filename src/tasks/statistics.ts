import { Task } from '#lib/structures/Task';
import { MessageFromServerAction } from '#lib/websocket/constants';
import { Time } from '#utils/constants';
import { ApplyOptions } from '@sapphire/decorators';
import type { PieceOptions } from '@sapphire/pieces';

@ApplyOptions<PieceOptions>({ enabled: process.env.NODE_ENV !== 'production' })
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

	public onLoad() {
		if (!this._interval) this._interval = this.create();
		return super.onLoad();
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
