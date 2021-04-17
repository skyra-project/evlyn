import '#lib/setup';
import { EvlynClient } from '#lib/EvlynClient';
import { green, red, yellow } from 'colorette';

async function main() {
	const client = new EvlynClient();

	try {
		await client
			.login()
			.then(() => console.log(`${green('[WS  ]')} Successfully logged in.`))
			.catch((error) => {
				throw `${red('[WS  ]')} ${yellow('Failed to login to Discord:')}\n${error}`;
			});
	} catch (error) {
		client.destroy();
		throw error;
	}
}

main().catch(console.error);
