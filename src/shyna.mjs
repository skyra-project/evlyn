import { TOKEN } from '../config';
import Shyna from './lib/Shyna.mjs';

Shyna.defaultPermissionLevels.add(0, (client, message) => client.owner === message.author);

new Shyna({
	disabledEvents: [
		'GUILD_BAN_ADD',
		'GUILD_BAN_REMOVE',
		'TYPING_START',
		'RELATIONSHIP_ADD',
		'RELATIONSHIP_REMOVE',
		'CHANNEL_PINS_UPDATE',
		'PRESENCE_UPDATE',
		'USER_UPDATE',
		'USER_NOTE_UPDATE',
		'MESSAGE_REACTION_ADD',
		'MESSAGE_REACTION_REMOVE',
		'MESSAGE_REACTION_REMOVE_ALL'
	],
	commandEditing: true,
	consoleEvents: { verbose: true },
	console: { useColor: true, utc: true },
	messageCacheLifetime: 120,
	messageCacheMaxSize: 25,
	messageSweepInterval: 300,
	pieceDefaults: { commands: { deletable: true, promptLimit: 5, quotedStringSupport: true } },
	prefix: 'sh!',
	presence: { activity: { name: 'and monitoring...', type: 'WATCHING' } },
	regexPrefix: /^(hey )?shyna(,|!)/i,
	dev: true
}).login(TOKEN);
