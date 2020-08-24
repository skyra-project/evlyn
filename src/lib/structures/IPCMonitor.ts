import { Piece } from 'klasa';
import { IPCMonitorStore } from './IPCMonitorStore';

export abstract class IPCMonitor extends Piece {
	/**
	 * The store that manages this instance
	 */
	// @ts-ignore 2345
	public store: IPCMonitorStore;

	public abstract run(message: any): any;
}
