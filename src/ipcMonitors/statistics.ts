import { ClientStatistics } from '@lib/types/Types';
import { IPCMonitor } from '../lib/structures/IPCMonitor';

export default class extends IPCMonitor {
	public run(): Record<string, ClientStatistics[][]> {
		return this.client.statistics;
	}
}
