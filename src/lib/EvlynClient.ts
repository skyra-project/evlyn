/* eslint-disable @typescript-eslint/no-invalid-this */
import { IPCMonitorStore } from '@lib/structures/IPCMonitorStore';
import { LanguageStore } from '@lib/structures/LanguageStore';
import { PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import { createArray } from '@utils/util';
import { green, red, yellow } from 'colorette';
import { ClientOptions } from 'discord.js';
import { Server as VezaServer } from 'veza';
import './extensions/Message';
import { TaskStore } from './structures/TaskStore';
import { ClientStatistics } from './types/Types';

const g = green('[IPC ]');
const y = yellow('[IPC ]');
const r = red('[IPC ]');

export class EvlynClient extends SapphireClient {
	public ipcMonitors = new IPCMonitorStore(this);
	public tasks = new TaskStore(this);
	public languages = new LanguageStore(this);

	public statistics = {
		aelia: createArray<ClientStatistics[]>(60, () => []),
		alestra: createArray<ClientStatistics[]>(60, () => []),
		evlyn: createArray<ClientStatistics[]>(60, () => []),
		skyra: createArray<ClientStatistics[]>(60, () => [])
	};

	public ipc = new VezaServer('evlyn-master')
		.on('disconnect', (client) => {
			console.log(`${y} Disconnected: ${client.name}`);
		})
		.on('open', () => {
			console.log(`${g} Ready ${this.ipc.name}`);
		})
		.on('error', (error, client) => {
			console.error(`${r} Error from ${client ? client.name : 'Unknown'}`, error);
		})
		.on('message', this.ipcMonitors.run.bind(this.ipcMonitors));

	public constructor({ dev = false, ...options }: ClientOptions) {
		super({ ...options, dev });
		this.registerStore(this.ipcMonitors) //
			.registerStore(this.tasks)
			.registerStore(this.languages);

		this.registerUserDirectories();
	}

	public fetchPrefix = () => PREFIX;
}
