// Remove `.example` from the file extension to configure Evlyn
import { LogLevel } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';

export const DEV = false;
export const EVLYN_PORT = 9997;
export const PREFIX = DEV ? 'ev!' : 'ev!';
export const OWNER_ID = '';

export const CLIENT_OPTIONS: ClientOptions = {
	dev: DEV,
	ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] },
	messageCacheLifetime: 120,
	messageCacheMaxSize: 25,
	messageSweepInterval: 300,
	presence: { activity: { name: 'and monitoring...', type: 'WATCHING' } },
	logger: { level: LogLevel.Debug },
	restTimeOffset: 0
};

export const TOKEN = '';
