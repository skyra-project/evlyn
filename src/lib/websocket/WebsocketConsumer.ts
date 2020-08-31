/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Time } from '@utils/constants';
import WebSocket, { Data } from 'ws';
import { CloseCodes, MessageFromClient, MessageFromClientAction, MessageFromServer, WebsocketEvents } from './types';
import type { WebsocketHandler } from './WebsocketHandler';

export default class WebsocketConsumer {
	public connection: WebSocket;

	#handler: WebsocketHandler;
	#name: string;

	public constructor(handler: WebsocketHandler, connection: WebSocket, name: string) {
		this.#handler = handler;
		this.#name = name;
		this.connection = connection;

		// Set up the event listeners
		this.connection.on(WebsocketEvents.Message, this.onMessage.bind(this));
		this.connection.once(WebsocketEvents.Close, this.onClose.bind(this));
	}

	public get client() {
		return this.#handler.client;
	}

	public send(message: MessageFromServer) {
		this.connection.send(JSON.stringify(message));
	}

	private handleHeartBeat(message: MessageFromClient) {
		const { name, ...statistics } = message.data;
		this.client.statistics[name].set(Date.now(), statistics);

		// If there are 60 or more entries for this client
		if (this.client.statistics[name].size >= 60) {
			// Then sweep any heartbearts of 5 minutes and older
			this.client.statistics[name].sweep((_, key) => key > Date.now() - Time.Minute * 5);
		}
	}

	private handleMessage(message: MessageFromClient) {
		switch (message.action) {
			case MessageFromClientAction.HeartBeat: {
				this.handleHeartBeat(message);
				break;
			}
		}
	}

	private onMessage(rawMessage: Data) {
		try {
			const parsedMessage: MessageFromClient = JSON.parse(rawMessage as string);
			this.handleMessage(parsedMessage);
		} catch {
			// They've sent invalid JSON, close the connection.
			this.connection.close(CloseCodes.ProtocolError);
		}
	}

	private onClose() {
		this.connection.removeAllListeners(WebsocketEvents.Message);

		// Only remove if the instance set is the same as this instance
		if (this.#handler.consumers.get(this.#name) === this) this.#handler.consumers.delete(this.#name);
	}
}
