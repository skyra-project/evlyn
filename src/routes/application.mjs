import { Route as KlasaRoute } from 'klasa-dashboard-hooks';
import { Duration } from 'klasa';

export default class Route extends KlasaRoute {

	constructor(client, store, file, core) {
		super(client, store, file, core, { route: 'application', enabled: false });
	}

	get(request, response) {
		return response.end(JSON.stringify({
			users: this.client.users.size,
			guilds: this.client.guilds.size,
			channels: this.client.channels.size,
			shards: this.client.options.shardCount,
			uptime: Duration.toNow(Date.now() - (process.uptime() * 1000)),
			latency: this.client.ping.toFixed(0),
			memory: process.memoryUsage().heapUsed / 1024 / 1024,
			invite: this.client.invite,
			...this.client.application
		}));
	}

}
