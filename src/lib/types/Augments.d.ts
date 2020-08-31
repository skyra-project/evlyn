import { LanguageStore } from '@lib/structures/LanguageStore';
import { TaskStore } from '@lib/structures/TaskStore';
import { ClientNames, MessageFromClientData } from '@lib/websocket/types';

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}

	interface Client {
		tasks: TaskStore;
		languages: LanguageStore;
		statistics: Record<ClientNames, Collection<number, Omit<MessageFromClientData, 'name'>>>;
	}
}
