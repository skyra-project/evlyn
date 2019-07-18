import { ClientStatistics } from '../lib/EvlynClient';
import { IPCMonitor } from '../lib/structures/IPCMonitor';
import { PresenceType } from '../lib/util/constants';

export default class extends IPCMonitor {

	public async run(): Promise<StatisticsResults> {
		const memoryUsage = process.memoryUsage();
		return {
			name: 'evlyn',
			presence: null,
			statistics: this.client.ws.shards.map(shard => ({
				heapTotal: memoryUsage.heapTotal,
				heapUsed: memoryUsage.heapUsed,
				ping: shard.pings,
				status: shard.status
			}))
		};
	}

}

/**
 * The return from the broadcast
 */
export interface StatisticsResults {
	name: string;
	presence: PresenceType | null;
	statistics: Pick<ClientStatistics, 'status' | 'heapTotal' | 'heapUsed' | 'ping'>[];
}
