import 'module-alias/register';
import 'reflect-metadata';
import '@utils/initClean';
import { EvlynClient } from '@lib/EvlynClient';
import { CLIENT_OPTIONS, EVLYN_HOST, EVLYN_PORT, TOKEN } from '@root/config';
import { inspect } from 'util';
inspect.defaultOptions.depth = 1;

const client = new EvlynClient(CLIENT_OPTIONS);
client.login(TOKEN).catch((error) => {
	client.console.error(error);
});

if (!CLIENT_OPTIONS.dev) {
	client.ipc.listen({ port: EVLYN_PORT, host: EVLYN_HOST }).catch((error) => {
		client.console.error(error);
	});
}
