import { Task } from 'klasa';
import { StatisticsResults } from '../ipcMonitors/socketStatistics';
import { PresenceType } from '../lib/util/constants';
import { removeFirstAndAdd } from '../lib/util/util';

export default class extends Task {

	private readonly _ids = {
		aelia: '338249781594030090',
		alestra: '419828209966776330',
		evlyn: '444081201297227776',
		skyra: '266624760782258186'
	};

	private _interval: NodeJS.Timer | null = this.create();

	public async run(): Promise<void> {
		const [broadcastSuccess, data] = await this.client.ipc.sendTo('ny-api', ['socketStatistics']) as [0 | 1, [0 | 1, StatisticsResults][]];
		if (!broadcastSuccess) return;
		for (const [success, entry] of data) {
			if (!success) continue;
			if (entry.name in this.client.statistics) {
				if (!entry.name) continue;
				const user = this.client.users.get(this._ids[entry.name]);
				if (user) entry.presence = this.parseStatus(user.presence.status);
				// Remove first element and add to the statistics table
				removeFirstAndAdd(this.client.statistics[entry.name], entry);
			}
		}
	}

	public async init(): Promise<void> {
		if (this.client.options.dev) this.disable();
	}

	public enable(): this {
		if (!this._interval) this._interval = this.create();
		return super.enable();
	}

	public disable(): this {
		if (this._interval) {
			this.client.clearInterval(this._interval);
			this._interval = null;
		}
		return super.disable();
	}

	private create(): NodeJS.Timer {
		return this.client.setInterval(() => {
			this.run()
				.catch(error => { this.client.emit('wtf', error); });
		}, 1000 * 60 * 5);
	}

	private parseStatus(status: 'online' | 'offline' | 'idle' | 'dnd'): PresenceType | null {
		switch (status) {
			case 'online': return PresenceType.Online;
			case 'offline': return PresenceType.Offline;
			case 'idle': return PresenceType.Idle;
			case 'dnd': return PresenceType.DoNotDisturb;
			default: return null;
		}
	}

}
