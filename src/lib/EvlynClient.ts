/* eslint-disable @typescript-eslint/no-invalid-this */
import { IPCMonitorStore } from '@lib/structures/IPCMonitorStore';
import { createArray } from '@utils/util';
import { Colors, KlasaClientOptions, util } from 'klasa';
import { DashboardClient } from 'klasa-dashboard-hooks';
import { Server as VezaServer } from 'veza';
import { ClientStatistics } from './types/Types';

const g = new Colors({ text: 'green' }).format('[IPC   ]');
const y = new Colors({ text: 'yellow' }).format('[IPC   ]');
const r = new Colors({ text: 'red' }).format('[IPC   ]');

export class EvlynClient extends DashboardClient {
	public ipcMonitors = new IPCMonitorStore(this);
	public statistics = {
		aelia: createArray<ClientStatistics[]>(60, () => []),
		alestra: createArray<ClientStatistics[]>(60, () => []),
		evlyn: createArray<ClientStatistics[]>(60, () => []),
		skyra: createArray<ClientStatistics[]>(60, () => [])
	};

	public ipc = new VezaServer('evlyn-master')
		.on('disconnect', (client) => {
			this.console.log(`${y} Disconnected: ${client.name}`);
		})
		.on('open', () => {
			this.console.log(`${g} Ready ${this.ipc.name}`);
		})
		.on('error', (error, client) => {
			this.console.error(`${r} Error from ${client ? client.name : 'Unknown'}`, error);
		})
		.on('message', this.ipcMonitors.run.bind(this.ipcMonitors));

	public constructor(options: KlasaClientOptions) {
		super(util.mergeDefault({ dev: false }, options));
		this.registerStore(this.ipcMonitors);
	}
}

EvlynClient.defaultPermissionLevels.add(0, ({ client, author }) => (author ? client.owners.has(author) : false), { break: true });
