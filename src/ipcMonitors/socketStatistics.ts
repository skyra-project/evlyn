import { ClientStatistics } from '@lib/types/Types';
import { IPCMonitor } from '@lib/structures/IPCMonitor';
import { PresenceType } from '@utils/constants';
import { Client } from 'discord.js';

export class ClientIPCMonitor extends IPCMonitor {
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
