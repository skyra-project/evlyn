import { ApiRequest } from '@lib/structures/api/ApiRequest';
import { ApiResponse } from '@lib/structures/api/ApiResponse';
import { ApplyOptions } from '@skyra/decorators';
import type { Client } from 'klasa';
import { Route, RouteOptions } from 'klasa-dashboard-hooks';

const error = JSON.stringify({ success: false, data: 'UNKNOWN_CLIENT' });

@ApplyOptions<RouteOptions>({
	route: 'status/:client'
})
export default class extends Route {
	public get(request: ApiRequest<RequestParams>, response: ApiResponse): void {
		if (Reflect.has(this.client.statistics, request.params.client)) {
			response.json({ data: this.client.statistics[request.params.client] });
		} else {
			response.error(error);
		}
	}
}

interface RequestParams extends Record<string, any> {
	client: keyof Client['statistics'];
}
