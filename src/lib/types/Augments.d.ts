import { LanguageStore } from '@lib/structures/LanguageStore';
import { TaskStore } from '@lib/structures/TaskStore';
import { ClientStatistics } from './Types';

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}

	interface Client {
		tasks: TaskStore;
		languages: LanguageStore;
		statistics: {
			aelia: ClientStatistics[][];
			alestra: ClientStatistics[][];
			evlyn: ClientStatistics[][];
			skyra: ClientStatistics[][];
		};
	}
}
