import { IPCMonitorStore } from '@lib/structures/IPCMonitorStore';
import 'klasa';
import { Server as VezaServer } from 'veza';
import { ClientStatistics } from './Types';

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}

	interface MessageExtendablesAskOptions {
		time?: number;
		max?: number;
	}

	interface Message {
		prompt(content: string, time?: number): Promise<Message>;
		ask(options?: MessageOptions, promptOptions?: MessageExtendablesAskOptions): Promise<boolean>;
		ask(content: string, options?: MessageOptions, promptOptions?: MessageExtendablesAskOptions): Promise<boolean>;
		alert(content: string, timer?: number): Promise<Message>;
		alert(content: string, options?: number | MessageOptions, timer?: number): Promise<Message>;
		nuke(time?: number): Promise<Message>;
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
