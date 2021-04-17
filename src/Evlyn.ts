import { EvlynClient } from '#lib/EvlynClient';
import '#lib/setup';
import { green, red, yellow } from 'colorette';

const client = new EvlynClient();

async function main() {
	try {
		await client.login();
		client.logger.info(`${green('WS     ')} - Successfully logged in.`);
	} catch (error) {
		client.destroy();
		throw `${red('WS     ')} - ${yellow('Failed to login to Discord:')}\n${error}`;
	}
}

main().catch(client.logger.error.bind(client.logger));
