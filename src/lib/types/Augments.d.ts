import type { ClientNames, MessageFromClientData } from '#lib/websocket/constants';
import type { WebsocketHandler } from '#lib/websocket/WebsocketHandler';

declare module 'discord.js' {
	interface Client {
		statistics: Record<ClientNames, Collection<number, Omit<MessageFromClientData, 'name'>>>;
		websocket: WebsocketHandler;
	}
}
