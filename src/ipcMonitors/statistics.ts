import { ClientStatistics, EvlynClient } from '../lib/EvlynClient';
import { IPCMonitor } from '../lib/structures/IPCMonitor';

export default class extends IPCMonitor {

	public client: EvlynClient;

	public run(): Record<string, ClientStatistics[][]> {
		return this.client.statistics;
	}

}
