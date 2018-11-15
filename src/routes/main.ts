import { ServerResponse } from 'http';
import { KlasaIncomingMessage, Route } from 'klasa-dashboard-hooks';

export default class extends Route {

	public route = '/';

	public async get(_: KlasaIncomingMessage, response: ServerResponse): Promise<void> {
		response.end(reply);
	}

}

const reply = JSON.stringify({ success: true, data: 'Hello World' });
