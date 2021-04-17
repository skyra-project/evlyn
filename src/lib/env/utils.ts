import { isNullish, Nullish } from '@sapphire/utilities';
import type { EvlynEnv, EvlynEnvAny, EvlynEnvBoolean, EvlynEnvInteger, EvlynEnvString } from './types';

function isNullishOrEmpty(value: unknown): value is Nullish | '' {
	return value === '' || isNullish(value);
}

export function envParseInteger(key: EvlynEnvInteger, defaultValue?: number): number {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an integer, but is empty or undefined.`);
		return defaultValue;
	}

	const integer = Number(value);
	if (Number.isInteger(integer)) return integer;
	throw new Error(`[ENV] ${key} - The key must be an integer, but received '${value}'.`);
}

export function envParseBoolean(key: EvlynEnvBoolean, defaultValue?: boolean): boolean {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be a boolean, but is empty or undefined.`);
		return defaultValue;
	}

	if (value === 'true') return true;
	if (value === 'false') return false;
	throw new Error(`[ENV] ${key} - The key must be a boolean, but received '${value}'.`);
}

export function envParseString<K extends EvlynEnvString>(key: K, defaultValue?: EvlynEnv[K]): EvlynEnv[K] {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be a string, but is empty or undefined.`);
		return defaultValue;
	}

	return value;
}

export function envParseArray(key: EvlynEnvString, defaultValue?: string[]): string[] {
	const value = process.env[key];
	if (isNullishOrEmpty(value)) {
		if (defaultValue === undefined) throw new Error(`[ENV] ${key} - The key must be an array, but is empty or undefined.`);
		return defaultValue;
	}

	return value.split(' ');
}

export function envIsDefined(...keys: readonly EvlynEnvAny[]): boolean {
	return keys.every((key) => !isNullishOrEmpty(process.env[key]));
}
