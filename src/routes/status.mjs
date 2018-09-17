import { Route as KlasaRoute } from 'klasa-dashboard-hooks';

export default class Route extends KlasaRoute {

	constructor(client, store, file, core) {
		super(client, store, file, core, { route: 'status' });
	}

	get(request, response) {
		// @ts-ignore
		return response.end(JSON.stringify(this.client.ipc.toJSON()));
	}

}
