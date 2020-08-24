// Remove `.example` from the file extension to configure Evlyn
import { ApiRequest } from '@lib/structures/api/ApiRequest';
import { ApiResponse } from '@lib/structures/api/ApiResponse';
import { KlasaClientOptions } from 'klasa';

export const DEV = false;
export const EVLYN_PORT = 9997;
export const EVLYN_HOST = 'localhost';
export const PREFIX = DEV ? 'ev!' : 'ev!';

export const CLIENT_OPTIONS: KlasaClientOptions = {
	commandEditing: true,
	commandMessageLifetime: 200,
	console: {
		colors: {
			debug: {
				message: { background: null, text: null, style: null },
				time: { background: null, text: 'magenta', style: null }
			},
			error: {
				message: { background: null, text: null, style: null },
				time: { background: 'red', text: 'white', style: null }
			},
			info: {
				message: { background: null, text: 'gray', style: null },
				time: { background: null, text: 'lightyellow', style: null }
			},
			log: {
				message: { background: null, text: null, style: null },
				time: { background: null, text: 'lightblue', style: null }
			},
			verbose: {
				message: { background: null, text: 'gray', style: null },
				time: { background: null, text: 'gray', style: null }
			},
			warn: {
				message: { background: null, text: 'lightyellow', style: null },
				time: { background: null, text: 'lightyellow', style: null }
			},
			wtf: {
				message: { background: null, text: 'red', style: null },
				time: { background: 'red', text: 'white', style: null }
			}
		},
		useColor: true,
		utc: true
	},
	consoleEvents: { verbose: true, debug: true },
	createPiecesFolders: false,
	customPromptDefaults: { limit: 5 },
	dev: DEV,
	owners: [''],
	disabledEvents: [
		'GUILD_BAN_ADD',
		'GUILD_BAN_REMOVE',
		'TYPING_START',
		'CHANNEL_PINS_UPDATE',
		'PRESENCE_UPDATE',
		'USER_UPDATE',
		'MESSAGE_REACTION_ADD',
		'MESSAGE_REACTION_REMOVE',
		'MESSAGE_REACTION_REMOVE_ALL',
		'VOICE_SERVER_UPDATE',
		'VOICE_STATE_UPDATE'
	],
	messageCacheLifetime: 120,
	messageCacheMaxSize: 25,
	messageSweepInterval: 300,
	pieceDefaults: {
		commands: { deletable: true, promptLimit: 5, quotedStringSupport: true, flagSupport: false },
		ipcMonitors: { enabled: true }
	},
	prefix: PREFIX,
	presence: { activity: { name: 'and monitoring...', type: 'WATCHING' } },
	providers: {
		default: 'cache'
	},
	readyMessage: (client) =>
		`Evlyn v2.0.0 ready! [${client.user!.tag}] [ ${client.guilds.size} [G]] [ ${client.guilds
			.reduce((a, b) => a + b.memberCount, 0)
			.toLocaleString()} [U]].`,
	regexPrefix: /evlyn[,!]/i,
	slowmode: 1000,
	restTimeOffset: 0,
	slowmodeAggressive: true,
	typing: false,
	dashboardHooks: {
		apiPrefix: '/',
		port: 8283,
		serverOptions: {
			IncomingMessage: ApiRequest,
			ServerResponse: ApiResponse
		}
	}
};

export const TOKEN = '';
