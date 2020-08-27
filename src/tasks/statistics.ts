import { Task } from '@lib/structures/Task';
import { StatisticsResults } from '../ipcMonitors/socketStatistics';
import { PresenceType } from '@utils/constants';
import { removeFirstAndAdd } from '@utils/util';
import { Client } from 'discord.js';

export class ClientTask extends Task {
	private readonly _ids = {
		aelia: '338249781594030090',
		alestra: '419828209966776330',
		evlyn: '444081201297227776',
		skyra: '266624760782258186'
	};

	// eslint-disable-next-line @typescript-eslint/no-invalid-this
	private _interval: NodeJS.Timer | null = this.create();

	public async run(): Promise<void> {
		const [broadcastSuccess, data] = (await this.client.ipc.broadcast(['socketStatistics'])) as [0 | 1, Array<[0 | 1, StatisticsResults]>];

		if (!broadcastSuccess) return;
		for (const [success, entry] of data) {
			if (!success) continue;

			const name = entry.name as keyof Client['statistics'];
			if (name in this.client.statistics) {
				if (!entry.name) continue;
				const user = this.client.users.cache.get(this._ids[name]);
				if (user) entry.presence = this.parseStatus(user.presence.status);
				// Remove first element and add to the statistics table
				removeFirstAndAdd(this.client.statistics[name], entry.statistics);
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public onLoad() {
		if (this.client.options.dev) {
			this.store.unload(this);
		} else {
			super.onLoad();
			if (!this._interval) this._interval = this.create();
		}
	}

	public onUnload() {
		if (this._interval) {
			this.client.clearInterval(this._interval);
			this._interval = null;
		}
	}

	private create(): NodeJS.Timer {
		this.run().catch((error) => {
			this.client.emit('wtf', error);
		});
		return this.client.setInterval(() => {
			this.run().catch((error) => {
				this.client.emit('wtf', error);
			});
		}, 1000 * 60 * 5);
	}

	private parseStatus(status: 'online' | 'invisible' | 'offline' | 'idle' | 'dnd'): PresenceType | null {
		switch (status) {
			case 'online':
				return PresenceType.Online;
			case 'invisible':
			case 'offline':
				return PresenceType.Offline;
			case 'idle':
				return PresenceType.Idle;
			case 'dnd':
				return PresenceType.DoNotDisturb;
			default:
				return null;
		}
	}
}
