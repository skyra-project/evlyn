import { EvlynClient } from '@lib/EvlynClient';
import { NodeMessage } from 'veza';
import { IPCMonitor } from './IPCMonitor';
import { BaseStore } from '@sapphire/framework';

export class IPCMonitorStore extends BaseStore<IPCMonitor> {
	public constructor(client: EvlynClient) {
		super(client, IPCMonitor as any, { name: 'ipcMonitors' });
	}

	public async run(message: NodeMessage): Promise<void> {
		if (!Array.isArray(message.data) || message.data.length === 0 || message.data.length > 2) {
			if (message.data) console.error('Invalid Payload', message.data);
			message.reply([0, 'INVALID_PAYLOAD']);
			return;
		}

		const [route, payload = null] = message.data;
		const monitor = this.get(route);
		if (!monitor) {
			message.reply([0, 'UNKNOWN_ROUTE']);
			return;
		}

		try {
			const result = await monitor.run(payload);
			message.reply([1, result]);
		} catch (error) {
			message.reply([0, error]);
		}
	}
}
