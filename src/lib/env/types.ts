export type BooleanString = 'true' | 'false';
export type IntegerString = `${bigint}`;

export type EvlynEnvAny = keyof EvlynEnv;
export type EvlynEnvString = { [K in EvlynEnvAny]: EvlynEnv[K] extends BooleanString | IntegerString ? never : K }[EvlynEnvAny];
export type EvlynEnvBoolean = { [K in EvlynEnvAny]: EvlynEnv[K] extends BooleanString ? K : never }[EvlynEnvAny];
export type EvlynEnvInteger = { [K in EvlynEnvAny]: EvlynEnv[K] extends IntegerString ? K : never }[EvlynEnvAny];

export interface EvlynEnv {
	NODE_ENV: 'test' | 'development' | 'production';
	DOTENV_DEBUG_ENABLED: BooleanString;

	CLIENT_NAME: string;
	CLIENT_VERSION: string;
	CLIENT_PREFIX: string;
	CLIENT_REGEX_PREFIX: string;
	CLIENT_OWNERS: string;
	CLIENT_ID: string;

	CLIENT_PRESENCE_NAME: string;
	CLIENT_PRESENCE_TYPE: string;

	WEBSOCKET_PORT: IntegerString;

	DISCORD_TOKEN: string;
}
