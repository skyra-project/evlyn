import type { LanguageStore } from '@lib/structures/LanguageStore';
import type { TaskStore } from '@lib/structures/TaskStore';
import type { ClientNames, MessageFromClientData } from '@lib/websocket/types';
import type { WebsocketHandler } from '@lib/websocket/WebsocketHandler';

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}

	interface Client {
		tasks: TaskStore;
		languages: LanguageStore;
		statistics: Record<ClientNames, Collection<number, Omit<MessageFromClientData, 'name'>>>;
		websocket: WebsocketHandler;
	}
}
