import { FetchError } from '@lib/errors/FetchError';
import { Events } from '@lib/types/Enums';
import { isThenable } from '@sapphire/utilities';
import { Client } from 'klasa';
import nodeFetch, { RequestInit, Response } from 'node-fetch';

export function removeFirstAndAdd<T>(array: Array<T>, value: T): Array<T> {
	let i = 0;
	while (i < array.length) {
		array[i] = array[++i];
	}

	array[i - 1] = value;
	return array;
}

export function createArray<T>(length: number, fill: (index: number, array: T[]) => T): T[] {
	const output: T[] = [];
	for (let i = 0; i < length; i++) output.push(fill(i, output));
	return output;
}

export function floatPromise(ctx: { client: Client }, promise: Promise<unknown>) {
	if (isThenable(promise)) promise.catch((error) => ctx.client.emit(Events.Wtf, error));
}

export const enum FetchResultTypes {
	JSON,
	Buffer,
	Text,
	Result
}

export const enum FetchMethods {
	Post = 'POST',
	Get = 'GET',
	Put = 'PUT',
	Delete = 'DELETE'
}

export async function fetch<R>(url: string, type?: FetchResultTypes.JSON): Promise<R>;
export async function fetch<R>(url: string, options: RequestInit, type?: FetchResultTypes.JSON): Promise<R>;
export async function fetch(url: string, type: FetchResultTypes.Buffer): Promise<Buffer>;
export async function fetch(url: string, options: RequestInit, type: FetchResultTypes.Buffer): Promise<Buffer>;
export async function fetch(url: string, type: FetchResultTypes.Text): Promise<string>;
export async function fetch(url: string, options: RequestInit, type: FetchResultTypes.Text): Promise<string>;
export async function fetch(url: string, type: FetchResultTypes.Result): Promise<Response>;
export async function fetch(url: string, options: RequestInit, type: FetchResultTypes.Result): Promise<Response>;
export async function fetch<R>(url: string, options: RequestInit, type: FetchResultTypes): Promise<Response | Buffer | string | R>;
export async function fetch(url: string, options?: RequestInit | FetchResultTypes, type?: FetchResultTypes) {
	if (typeof options === 'undefined') {
		options = {};
		type = FetchResultTypes.JSON;
	} else if (typeof options === 'number') {
		type = options;
		options = {};
	} else if (typeof type === 'undefined') {
		type = FetchResultTypes.JSON;
	}

	const result: Response = await nodeFetch(url, options);
	if (!result.ok) throw new FetchError(url, result.status, await result.text());

	switch (type) {
		case FetchResultTypes.Result:
			return result;
		case FetchResultTypes.Buffer:
			return result.buffer();
		case FetchResultTypes.JSON:
			return result.json();
		case FetchResultTypes.Text:
			return result.text();
		default:
			throw new Error(`Unknown type ${type}`);
	}
}
