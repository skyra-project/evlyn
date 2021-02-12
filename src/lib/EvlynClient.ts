/* eslint-disable @typescript-eslint/no-invalid-this */
import { PREFIX } from '#root/config';
import { SapphireClient } from '@sapphire/framework';
import { ClientOptions, Collection } from 'discord.js';
import { TaskStore } from './structures/TaskStore';
import { ClientNames, MessageFromClientData } from './networking/websocket/types';
import { WebsocketHandler } from './networking/websocket/WebsocketHandler';

import '@sapphire/plugin-logger/register';
import '@skyra/editable-commands';

export class EvlynClient extends SapphireClient {
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
			dev
		});
		this.stores.register(new TaskStore());
	}

	public fetchPrefix = () => PREFIX;
}
