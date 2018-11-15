import { platform } from 'os';
import { inspect } from 'util';
import { CLIENT_OPTIONS, TOKEN } from '../config';
import { EvlynClient } from './lib/EvlynClient';
inspect.defaultOptions.depth = 1;

EvlynClient.defaultClientSchema.add('notificationChannel', 'TextChannel');

const client = new EvlynClient(CLIENT_OPTIONS);
client.login(TOKEN).catch((error) => { client.console.error(error); });

if (!CLIENT_OPTIONS.dev) {
	client.ipc.connectTo('ny-api', platform() === 'win32' ? '//./pipe/tmp/NyAPI.sock' : '/tmp/NyAPI.sock')
		.catch((error) => { client.console.error(error); });
}
