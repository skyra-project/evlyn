import { inspect } from 'util';
import { CLIENT_OPTIONS, TOKEN, EVLYN_PORT } from '../config';
import { EvlynClient } from './lib/EvlynClient';
inspect.defaultOptions.depth = 1;

EvlynClient.defaultClientSchema.add('notificationChannel', 'TextChannel');

const client = new EvlynClient(CLIENT_OPTIONS);
client.login(TOKEN)
	.catch(error => { client.console.error(error); });

if (!CLIENT_OPTIONS.dev) {
	client.ipc.listen(EVLYN_PORT)
		.catch(error => { client.console.error(error); });
}
