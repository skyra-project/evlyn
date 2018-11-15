/**
 * The presence types
 */
export enum PresenceType {
	/**
	 * The Online status
	 */
	Online = 'online',
	/**
	 * The Offline status
	 */
	Offline = 'offline',
	/**
	 * The Idle status
	 */
	Idle = 'idle',
	/**
	 * The Do Not Disturb status
	 */
	DoNotDisturb = 'dnd'
}

export const PRESENCE_STATUS = [
	PresenceType.Online,
	PresenceType.Offline,
	PresenceType.Idle,
	PresenceType.DoNotDisturb
];
