import { ClientStatistics } from '@lib/types/Types';
import { IPCMonitor } from '@lib/structures/IPCMonitor';

export class ClientIPCMonitor extends IPCMonitor {
	public run(): Record<string, ClientStatistics[][]> {
		return this.client.statistics;
	}
}
