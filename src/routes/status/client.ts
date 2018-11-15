import { ServerResponse } from 'http';
import { KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
import { EvlynClient } from '../../lib/EvlynClient';

export default class extends Route {

	public client: EvlynClient;

	public constructor(client: EvlynClient, store: RouteStore, file: string[], directory: string) {
		super(client, store, file, directory, { route: 'status/:client' });
	}

	public async get(request: KlasaIncomingMessage, response: ServerResponse): Promise<void> {
		if (request.params.client in this.client.statistics) {
			response.end(JSON.stringify({ success: true, data: this.client.statistics[request.params.client] }));
		} else {
			response.end(error);
		}
	}

}

const error = JSON.stringify({ success: false, data: 'UNKNOWN_CLIENT' });
