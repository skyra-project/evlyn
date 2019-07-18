import { ClientStatistics } from '../lib/EvlynClient';
import { IPCMonitor } from '../lib/structures/IPCMonitor';

export default class extends IPCMonitor {

	public run(): Record<string, ClientStatistics[][]> {
		return this.client.statistics;
	}

}
