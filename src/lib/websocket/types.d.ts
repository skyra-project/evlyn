import { PresenceStatus } from 'discord.js';

export const enum ClientNames {
	Aelia = 'aelia',
	Alestra = 'alestra',
	Evlyn = 'evlyn',
	Skyra = 'skyra'
}

export const enum WebsocketEvents {
	Message = 'message',
	Connection = 'connection',
	Upgrade = 'upgrade',
	Close = 'close',
	Error = 'error',
	Listening = 'listening'
}

export const enum MessageFromClientAction {
	HeartBeat = 'HEART_BEAT'
}

export const enum MessageFromServerAction {
	Ping = 'PING'
}

/**
 * The client statistics for each shard
 */
export interface MessageFromClientData {
	/** The Client ID of the client sending this data */
	name: ClientNames;
	/** The Discord presence of the bot */
	presence: PresenceStatus;
	/** The total size of the heap */
	heapTotal: number;
	/** The used amount of the heap */
	heapUsed: number;
	/** The ping of the shard */
	ping: number;
	/** The status of the websocket connection to Discord */
	status: WebsocketStatus;
}

export interface MessageFromClient {
	/** The action that is being received by the server */
	action: MessageFromClientAction;
	/** The data that has been received by the server */
	data: MessageFromClientData;
}

export interface MessageFromServer {
	/** The action that is being send to the consumer */
	action: MessageFromServerAction;
}

export const enum CloseCodes {
	ProtocolError = 1002,
	PolicyViolation = 1008,
	InternalError = 1011,
	Unauthorized = 4301,
	DuplicatedConnection = 4302
}

/**
 * The websocket status
 */
export const enum WebsocketStatus {
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
