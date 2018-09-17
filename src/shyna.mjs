import { TOKEN } from '../config';
import Shyna from './lib/Shyna';

Shyna.defaultPermissionLevels.add(0, (client, message) => client.owner === message.author);

// Load klasa-dashboard-hooks
import KlasaDashboardHooks from 'klasa-dashboard-hooks';
Shyna.use(KlasaDashboardHooks);

// eslint-disable-next-line no-process-env
const DEV = 'DEV' in process.env ? process.env.DEV === 'true' : !('PM2_HOME' in process.env);

new Shyna({
	disabledEvents: [
		'GUILD_BAN_ADD',
		'GUILD_BAN_REMOVE',
		'TYPING_START',
		'CHANNEL_PINS_UPDATE',
		'PRESENCE_UPDATE',
		'MESSAGE_REACTION_ADD',
		'MESSAGE_REACTION_REMOVE',
		'MESSAGE_REACTION_REMOVE_ALL'
	],
	commandEditing: true,
	dashboardHooks: { port: 9010 },
	consoleEvents: { verbose: true },
	console: { useColor: true, utc: true },
	messageCacheLifetime: 120,
	messageCacheMaxSize: 25,
	messageSweepInterval: 300,
	pieceDefaults: { commands: { deletable: true, promptLimit: 5, quotedStringSupport: true } },
	prefix: 'sh!',
	presence: { activity: { name: 'and monitoring...', type: 'WATCHING' } },
	regexPrefix: /^(hey )?shyna[,!]/i,
	dev: DEV
}).login(TOKEN);
