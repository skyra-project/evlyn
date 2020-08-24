import { PresenceType } from '@utils/constants';

/**
 * The constructor type
 */
export type ConstructorType<V> = new (...args: any[]) => V;

/**
 * The client statistics for each shard
 */
export interface ClientStatistics {
	presence: PresenceType;
	status: WebsocketStatus;
	heapUsed: number;
	heapTotal: number;
	ping: number;
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
