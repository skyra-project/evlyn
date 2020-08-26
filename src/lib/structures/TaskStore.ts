import { EvlynClient } from '@lib/EvlynClient';
import { Task } from './Task';
import { BaseStore } from '@sapphire/framework';

export class TaskStore extends BaseStore<Task> {
	public constructor(client: EvlynClient) {
		// @ts-expect-error 2345
		super(client, Task);
	}
}
