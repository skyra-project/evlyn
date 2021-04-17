import { CLIENT_OPTIONS } from '#root/config';
import { SapphireClient } from '@sapphire/framework';
import { Collection } from 'discord.js';
import { TaskStore } from './structures/TaskStore';
import { ClientNames, MessageFromClientData } from './websocket/constants';
import { WebsocketHandler } from './websocket/WebsocketHandler';

export class EvlynClient extends SapphireClient {
	public statistics = {
		[ClientNames.Aelia]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Alestra]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Evlyn]: new Collection<number, Omit<MessageFromClientData, 'name'>>(),
		[ClientNames.Skyra]: new Collection<number, Omit<MessageFromClientData, 'name'>>()
	};

	public websocket = new WebsocketHandler(this);

	public constructor() {
		super(CLIENT_OPTIONS);
		this.stores.register(new TaskStore());
	}
}
