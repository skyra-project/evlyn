import { ServerResponse } from 'http';
import { KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';

const reply = JSON.stringify({ success: true, data: 'Hello World' });

export default class extends Route {

	public constructor(store: RouteStore, file: string[], directory: string) {
		super(store, file, directory, { route: '/' });
	}

	public async get(_: KlasaIncomingMessage, response: ServerResponse): Promise<void> {
		response.end(reply);
	}

}
