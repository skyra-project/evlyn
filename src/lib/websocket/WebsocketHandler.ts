import { envParseInteger } from '#lib/env';
import { EvlynClient } from '#lib/EvlynClient';
import Collection from '@discordjs/collection';
import { enumerable } from '@sapphire/decorators';
import { green, red, yellow } from 'colorette';
import type { IncomingMessage } from 'http';
import WebSocket, { Server } from 'ws';
import { CloseCodes, WebsocketEvents } from './constants';
import WebsocketConsumer from './WebsocketConsumer';

export class WebsocketHandler {
	public wss: Server;
	public consumers = new Collection<string, WebsocketConsumer>();

	@enumerable(false)
	public client: EvlynClient;

	public constructor(client: EvlynClient) {
		this.client = client;
		this.wss = new Server({ port: envParseInteger('WEBSOCKET_PORT') });

		this.wss.once(WebsocketEvents.Listening, this.handleLogListening.bind(this));
		this.wss.on(WebsocketEvents.Error, this.handleLogError.bind(this));
		this.wss.on(WebsocketEvents.Connection, this.handleConnection.bind(this));
	}

	private handleConnection(ws: WebSocket, request: IncomingMessage) {
		try {
			const { authorization: clientName } = request.headers;
			if (!clientName) return ws.close(CloseCodes.Unauthorized);

			// If they already have a connection with the same client name, close the previous.
			const previous = this.consumers.get(clientName);
			if (previous) previous.connection.close(CloseCodes.DuplicatedConnection);

			// We have a new "consumer", add them to this.consumers
			const websocketConsumer = new WebsocketConsumer(this, ws, clientName);
			this.consumers.set(clientName, websocketConsumer);
		} catch {
			return ws.close(CloseCodes.ProtocolError);
		}
	}

	private handleLogListening() {
		console.log(`${green('[STAT-WS ]')} Ready to accept connections.`);
	}

	private handleLogError(_: Server, error: Error) {
		throw `${red('[STAT-WS ]')} ${yellow('Failed to open the socket:')}\n${error.message || error.stack || 'Unknown error'}`;
	}
}
