import { ApiRequest } from '@lib/structures/api/ApiRequest';
import { ApiResponse } from '@lib/structures/api/ApiResponse';
import { ApplyOptions } from '@skyra/decorators';
import { Route, RouteOptions } from 'klasa-dashboard-hooks';

@ApplyOptions<RouteOptions>({ route: '/' })
export default class extends Route {
	public get(_: ApiRequest, response: ApiResponse): void {
		response.json({ data: 'Hello World' });
	}
}
