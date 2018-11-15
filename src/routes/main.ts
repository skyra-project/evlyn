import { ServerResponse } from 'http';
import { KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
import { EvlynClient } from '../lib/EvlynClient';

export default class extends Route {

	public constructor(client: EvlynClient, store: RouteStore, file: string[], directory: string) {
		super(client, store, file, directory, { route: '/' });
	}

	public async get(_: KlasaIncomingMessage, response: ServerResponse): Promise<void> {
		response.end(reply);
	}

}

const reply = JSON.stringify({ success: true, data: 'Hello World' });
