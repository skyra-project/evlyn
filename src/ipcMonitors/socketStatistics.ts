import { ClientStatistics } from '@lib/types/Types';
import type { Client } from 'klasa';
import { IPCMonitor } from '../lib/structures/IPCMonitor';
import { PresenceType } from '../lib/util/constants';

export default class extends IPCMonitor {
	public run(): StatisticsResults {
		const memoryUsage = process.memoryUsage();
		return {
			name: 'evlyn',
			presence: null,
			statistics: this.client.ws.shards.map((shard) => ({
				heapTotal: memoryUsage.heapTotal,
				heapUsed: memoryUsage.heapUsed,
				ping: [shard.ping, shard.ping, shard.ping],
				status: shard.status
			}))
		};
	}
}

/**
 * The return from the broadcast
 */
export interface StatisticsResults {
	name: keyof Client['statistics'];
	presence: PresenceType | null;
	statistics: Pick<ClientStatistics, 'status' | 'heapTotal' | 'heapUsed' | 'ping'>[];
}
