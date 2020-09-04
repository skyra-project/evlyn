/* eslint-disable @typescript-eslint/no-invalid-this */
import { LanguageStore } from '@lib/structures/LanguageStore';
import { PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import { ClientOptions, Collection } from 'discord.js';
import { TaskStore } from './structures/TaskStore';
import { ClientNames, MessageFromClientData } from './websocket/types';
import { WebsocketHandler } from './websocket/WebsocketHandler';

export class EvlynClient extends SapphireClient {
	public tasks = new TaskStore(this);
	public languages = new LanguageStore(this);

	public statistics = {
		[ClientNames.Aelia]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Alestra]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Evlyn]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Skyra]: new Collection<number, Omit<MessageFromClientData, 'name'>>()
	};

	public websocket = new WebsocketHandler(this);

	public constructor({ dev = false, ...options }: ClientOptions) {
		super({ ...options, dev });
		this.registerStore(this.languages) //
			.registerStore(this.tasks)
			.registerUserDirectories();
	}

	public fetchPrefix = () => PREFIX;
}
