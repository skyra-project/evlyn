import { Node } from 'veza';
import { removeFirstAndAdd } from '../util/util';

export default class Manager extends Node {

	/**
	 * @typedef {Object} ManagerShardStatus
	 * @property {number[]} ipcLink
	 * @property {number[]} status
	 */

	constructor(client) {
		super('shyna');

		this.client = client;

		/**
		 * The IPC server that manages this link
		 * @since 0.0.1
		 * @type {Node}
		 */
		this
			.on('client.identify', (node) => this.client.emit('verbose', `[IPC] Client Connected: ${node.name}`))
			.on('client.disconnect', (node) => this.client.emit('warn', `[IPC] Client Disconnected: ${node.name}`))
			.on('client.destroy', (node) => this.client.emit('warn', `[IPC] Client Destroyed: ${node.name}`))
			.on('server.ready', (server) => this.client.emit('verbose', `[IPC] Client Ready: Named ${server.name}`))
			.on('error', (error, node) => this.client.emit('error', `[IPC] Error from ${node.name}: ${error}`))
			.on('message', (message) => {
				const reply = message.reply.bind(message);
				this.client.ipcPieces.run(message)
					.then(reply)
					.catch(reply);
			});

		this.serve(8989)
			.catch((error) => this.client.emit('error', `[IPC] Disconnected! ${error}`));

		/**
		 * The cached statuses for both processes
		 * @since 0.0.1
		 * @type {Map<string, ManagerShardStatus>}
		 */
		this.statuses = new Map()
			.set('skyra', { ipcLink: new Array(30).fill(0), status: new Array(30).fill(0) })
			.set('sneyra', { ipcLink: new Array(30).fill(0), status: new Array(30).fill(0) });

		Object.defineProperty(this, '_timeout', { value: this.client.setInterval(this.checkStatus.bind(this), 60000) });
		Object.defineProperty(this, '_skyraUser', { value: null, writable: true });
		Object.defineProperty(this, '_sneyraUser', { value: null, writable: true });
	}

	get skyraUser() {
		if (!this._skyraUser) this._skyraUser = this.client.users.get('266624760782258186');
		return this._skyraUser;
	}

	get sneyraUser() {
		if (!this._sneyraUser) this._sneyraUser = this.client.users.get('338249781594030090');
		return this._sneyraUser;
	}

	checkStatus() {
		this._checkStatus('skyra-dashboard', 'skyra', this.skyraUser.presence);
		this._checkStatus('sneyra-dashboard', 'sneyra', this.sneyraUser.presence);
	}

	async _checkStatus(route, name, presence) {
		const { response: status } = this.client.dev ? { response: [0] } : await this.sendTo(route, { route: 'status' });
		const cacheStatus = this.statuses.get(name);

		// Update the IPC status
		removeFirstAndAdd(cacheStatus.ipcLink, status);
		// Update the Discord status
		removeFirstAndAdd(cacheStatus.status, presence.status);

		const reconnectShards = this.checkShardsStatus(status);
		if (reconnectShards.length) this.sendTo(route, { route: 'reconnect', reconnectShards });
	}

	checkShardsStatus(statuses) {
		const output = [];

		for (let i = 0; i < statuses.length; i++) {
			const lastStatus = statuses[i];
			// If status is IDLE or DISCONNECTED, push the shard to reconnect
			if (lastStatus === 3 || lastStatus === 5) output.push(i);
		}

		return output;
	}

}
