/* eslint-disable @typescript-eslint/no-invalid-this */
import { PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import { list } from '@utils/language-functions';
import { ClientOptions, Collection } from 'discord.js';
import i18next from 'i18next';
import { TaskStore } from './structures/TaskStore';
import { EvlynFormatters } from './types/Types';
import { ClientNames, MessageFromClientData } from './websocket/types';
import { WebsocketHandler } from './websocket/WebsocketHandler';

import '@scp/in17n/register';

export class EvlynClient extends SapphireClient {
	public tasks = new TaskStore(this);

	public statistics = {
		[ClientNames.Aelia]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Alestra]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Evlyn]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Skyra]: new Collection<number, Omit<MessageFromClientData, 'name'>>()
	};

	public websocket = new WebsocketHandler(this);

	public constructor({ dev = false, ...options }: ClientOptions) {
		super({
			...options,
			dev,
			i18n: {
				missingKey: 'global:missingKey',
				i18next: {
					preload: ['en-US'],
					load: 'all',
					fallbackLng: 'en-US',
					initImmediate: false,
					interpolation: {
						escapeValue: false,
						format: (value: unknown, format?: string) => {
							switch (format as EvlynFormatters) {
								case EvlynFormatters.AndList: {
									return list(value as string[], i18next.t('global:and'));
								}
								case EvlynFormatters.OrList: {
									return list(value as string[], i18next.t('global:or'));
								}
								case EvlynFormatters.Permissions: {
									return i18next.t(`permissions:${value}`);
								}
								default:
									return value as string;
							}
						}
					}
				}
			}
		});
		this.registerStore(this.tasks) //
			.registerUserDirectories();
	}

	public fetchPrefix = () => PREFIX;
	public fetchLanguage = () => 'en-US';
}
