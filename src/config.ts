// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import { envParseArray, envParseBoolean, envParseString } from '#lib/env';
import { srcFolder } from '#utils/constants';
import { LogLevel } from '@sapphire/framework';
import type { ActivityType, ClientOptions, PresenceData } from 'discord.js';
import { config } from 'dotenv-cra';
import { join } from 'path';

// Read config:
config({
	debug: process.env.DOTENV_DEBUG_ENABLED ? envParseBoolean('DOTENV_DEBUG_ENABLED') : undefined,
	path: join(srcFolder, '.env')
});

export const OWNERS = envParseArray('CLIENT_OWNERS');

function parsePresenceActivity(): PresenceData['activity'] | undefined {
	const { CLIENT_PRESENCE_NAME } = process.env;
	if (!CLIENT_PRESENCE_NAME) return undefined;

	return {
		name: CLIENT_PRESENCE_NAME,
		type: envParseString('CLIENT_PRESENCE_TYPE', 'WATCHING') as ActivityType
	};
}

function parseRegExpPrefix(): RegExp | undefined {
	const { CLIENT_REGEX_PREFIX } = process.env;
	return CLIENT_REGEX_PREFIX ? new RegExp(CLIENT_REGEX_PREFIX, 'i') : undefined;
}

export const CLIENT_OPTIONS: ClientOptions = {
	ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] },
	messageCacheLifetime: 120,
	messageCacheMaxSize: 25,
	messageSweepInterval: 300,
	defaultPrefix: envParseString('CLIENT_PREFIX'),
	presence: { activity: parsePresenceActivity() },
	regexPrefix: parseRegExpPrefix(),
	logger: { level: envParseString('NODE_ENV') === 'production' ? LogLevel.Info : LogLevel.Debug },
	restTimeOffset: 0,
	caseInsensitiveCommands: true,
	caseInsensitivePrefixes: true
};
