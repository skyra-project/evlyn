import { Colors, util, KlasaClientOptions } from 'klasa';
import { DashboardClient } from 'klasa-dashboard-hooks';
import { Server as VezaServer } from 'veza';
import { IPCMonitorStore } from './structures/IPCMonitorStore';
import { PresenceType } from './util/constants';
import { createArray } from './util/util';

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
		.on('disconnect', client => { this.console.log(`${y} Disconnected: ${client.name}`); })
		.on('open', () => { this.console.log(`${g} Ready ${this.ipc.name}`); })
		.on('error', (error, client) => { this.console.error(`${r} Error from ${client ? client.name : 'Unknown'}`, error); })
		.on('message', this.ipcMonitors.run.bind(this.ipcMonitors));

	public constructor(options: KlasaClientOptions) {
		super(util.mergeDefault({ dev: false }, options));
		this.registerStore(this.ipcMonitors);
	}

}

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}
}

declare module 'klasa' {

	interface Client {
		ipcMonitors: IPCMonitorStore;
		statistics: {
			aelia: ClientStatistics[][];
			alestra: ClientStatistics[][];
			evlyn: ClientStatistics[][];
			skyra: ClientStatistics[][];
		};
		ipc: VezaServer;
	}

	interface PieceDefaults {
		ipcMonitors?: PieceOptions;
	}

}

EvlynClient.defaultPermissionLevels.add(0, ({ client, author }) => author ? client.owners.has(author) : false, { 'break': true });

/**
 * The client statistics for each shard
 */
export interface ClientStatistics {
	presence: PresenceType;
	status: WebsocketStatus;
	heapUsed: number;
	heapTotal: number;
	ping: number[];
}

/**
 * The websocket status
 */
export enum WebsocketStatus {
	/**
	 * The websocket is active
	 */
	Ready,
	/**
	 * The websocket is connecting
	 */
	Connecting,
	/**
	 * The websocket is reconnecting
	 */
	Reconnecting,
	/**
	 * The websocket is idle
	 */
	Idle,
	/**
	 * The websocket is nearly ready, fetching last data
	 */
	Nearly,
	/**
	 * The websocket is disconnected
	 */
	Disconnected
}
