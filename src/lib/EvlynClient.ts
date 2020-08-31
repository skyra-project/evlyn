/* eslint-disable @typescript-eslint/no-invalid-this */
import { LanguageStore } from '@lib/structures/LanguageStore';
import { PREFIX } from '@root/config';
import { SapphireClient } from '@sapphire/framework';
import { createArray } from '@utils/util';
import { ClientOptions } from 'discord.js';
import { TaskStore } from './structures/TaskStore';
import { ClientStatistics } from './types/Types';

export class EvlynClient extends SapphireClient {
	public tasks = new TaskStore(this);
	public languages = new LanguageStore(this);

	public statistics = {
		aelia: createArray<ClientStatistics[]>(60, () => []),
		alestra: createArray<ClientStatistics[]>(60, () => []),
		evlyn: createArray<ClientStatistics[]>(60, () => []),
		skyra: createArray<ClientStatistics[]>(60, () => [])
	};

	public constructor({ dev = false, ...options }: ClientOptions) {
		super({ ...options, dev });
		this.registerStore(this.languages);
		// .registerStore(this.tasks) //

		this.registerUserDirectories();
	}

	public fetchPrefix = () => PREFIX;
}
