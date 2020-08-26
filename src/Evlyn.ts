import 'module-alias/register';
import 'reflect-metadata';

// Other exports
import { EvlynClient } from '@lib/EvlynClient';
import { CLIENT_OPTIONS, DEV, EVLYN_HOST, EVLYN_PORT, TOKEN } from '@root/config';
import '@utils/initClean';
import { green, red, yellow } from 'colorette';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { inspect } from 'util';

inspect.defaultOptions.depth = 1;

async function main() {
	const client = new EvlynClient(CLIENT_OPTIONS);

	try {
		await i18next
			.use(Backend)
			.init({
				backend: { loadPath: './locales/{{lng}}/{{ns}}.json' },
				debug: DEV,
				fallbackLng: 'en-US',
				initImmediate: false,
				interpolation: { escapeValue: false },
				load: 'all',
				ns: ['commands', 'misc', 'resolvers'],
				preload: ['en-US']
			})
			.then(() => console.log(`${green('[i18n]')} Successfully loaded i18n data.`))
			.catch((error) => {
				throw `${red('[i18n]')} ${yellow('Failed to load i18n data:')}\n${error}`;
			});

		await client
			.login(TOKEN)
			.then(() => console.log(`${green('[WS  ]')} Successfully logged in.`))
			.catch((error) => {
				throw `${red('[WS  ]')} ${yellow('Failed to login to Discord:')}\n${error}`;
			});

		if (!DEV) {
			client.ipc
				.listen({ port: EVLYN_PORT, host: EVLYN_HOST })
				.then(() => console.log(`${green('[IPC ]')} Ready to accept connections.`))
				.catch((error) => {
					throw `${red('[IPC ]')} ${yellow('Failed to open the socket:')}\n${error}`;
				});
		}
	} catch (error) {
		client.destroy();
		throw error;
	}
}

main().catch(console.error);
