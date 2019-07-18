import { ServerResponse } from 'http';
import { KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
const error = JSON.stringify({ success: false, data: 'UNKNOWN_CLIENT' });

export default class extends Route {


	public constructor(store: RouteStore, file: string[], directory: string) {
		super(store, file, directory, { route: 'status/:client' });
	}

	public async get(request: KlasaIncomingMessage, response: ServerResponse): Promise<void> {
		if (request.params.client in this.client.statistics) {
			response.end(JSON.stringify({ success: true, data: this.client.statistics[request.params.client] }));
		} else {
			response.end(error);
		}
	}

}
