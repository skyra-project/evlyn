import type { ClientNames, MessageFromClientData } from '#lib/networking/websocket/types';
import type { WebsocketHandler } from '#lib/networking/websocket/WebsocketHandler';

declare module 'discord.js' {
	interface ClientOptions {
		dev?: boolean;
	}

	interface Client {
		statistics: Record<ClientNames, Collection<number, Omit<MessageFromClientData, 'name'>>>;
		websocket: WebsocketHandler;
	}
}
