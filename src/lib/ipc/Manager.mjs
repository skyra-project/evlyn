import { Server } from 'ipc-link';
import { removeFirstAndAdd } from '../util/util';

class Manager {

	/**
	 * @typedef {Object} ManagerShardStatus
	 * @property {number[]} ipcLink
	 * @property {number[]} status
	 */

	constructor(client) {
		this.client = client;

		/**
		 * The IPC server that manages this link
		 * @since 0.0.1
		 * @type {Server}
		 */
		this.server = new Server('shyna', { retry: 1500, silent: true })
			.on('message', (message) => this.client.emit('apiMessage', message))
			.on('error', (error) => this.client.emit('error', error))
			.on('connect', () => this.client.emit('verbose', 'IPC Channel Connected'))
			.on('disconnect', () => this.client.emit('warn', 'IPC Channel Disconnected'))
			.on('destroy', () => this.client.emit('warn', 'IPC Channel Destroyed'))
			.on('socket.disconnected', (socket, destroyedSocketID) => this.client.emit('verbose', `The Socket ${destroyedSocketID} has disconnected!`))
			.once('start', () => console.log(`[IPC] Successfully started`))
			.start();

		/**
		 * The cached statuses for both processes
		 * @since 0.0.1
		 * @type {Map<string, ManagerShardStatus>}
		 */
		this.statuses = new Map()
			.set('skyra', { ipcLink: new Array(30).fill(0), status: new Array(30).fill(0) })
			.set('sneyra', { ipcLink: new Array(30).fill(0), status: new Array(30).fill(0) });

		Object.defineProperty(this, '_timeout', { value: setInterval(this.checkStatus.bind(this), 60000) });
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
		Promise.all([
			this._checkStatus('skyra-dashboard', 'skyra', this.skyraUser.presence),
			this._checkStatus('sneyra-dashboard', 'sneyra', this.sneyraUser.presence)
		]);
	}

	async _checkStatus(route, name, presence) {
		const { response: status } = this.client.dev ? { response: [0] } : await this.server.send(route);
		const cacheStatus = this.statuses.get(name);

		// Update the IPC status
		removeFirstAndAdd(cacheStatus.ipcLink, status);
		// Update the Discord status
		removeFirstAndAdd(cacheStatus.status, presence.status);

		const reconnectShards = this.checkShardsStatus(status);
		if (reconnectShards.length) this.server.send(route, { route: 'reconnect', reconnectShards });
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

export default Manager;
