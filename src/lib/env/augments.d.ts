import type { EvlynEnv } from './types';

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EvlynEnv {}
	}
}
