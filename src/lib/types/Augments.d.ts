import { IPCMonitorStore } from '@lib/structures/IPCMonitorStore';
import { Language } from '@lib/structures/Language';
import { LanguageStore } from '@lib/structures/LanguageStore';
import { TaskStore } from '@lib/structures/TaskStore';
import { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import { Server as VezaServer } from 'veza';
import { ClientStatistics } from './Types';

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}

	interface Client {
		ipcMonitors: IPCMonitorStore;
		tasks: TaskStore;
		languages: LanguageStore;
		statistics: {
			aelia: ClientStatistics[][];
			alestra: ClientStatistics[][];
			evlyn: ClientStatistics[][];
			skyra: ClientStatistics[][];
		};
		ipc: VezaServer;
	}

	interface Message {
		language: Language;

		// basic usage
		// eslint-disable-next-line @typescript-eslint/ban-types
		sendTranslated<TResult extends TFunctionResult = string, TKeys extends TFunctionKeys = string, TInterpolationMap extends object = StringMap>(
			key: TKeys | TKeys[],
			options?: TOptions<TInterpolationMap> | string
		): Promise<Message | Message[]>;

		// overloaded usage
		// eslint-disable-next-line @typescript-eslint/ban-types
		sendTranslated<TResult extends TFunctionResult = string, TKeys extends TFunctionKeys = string, TInterpolationMap extends object = StringMap>(
			key: TKeys | TKeys[],
			defaultValue?: string,
			options?: TOptions<TInterpolationMap> | string
		): Promise<Message | Message[]>;
	}
}
