import { EvlynClient } from '@lib/EvlynClient';
import { Task } from './Task';
import { BaseStore } from '@sapphire/framework';

export class TaskStore extends BaseStore<Task> {
	public constructor(client: EvlynClient) {
		super(client, Task as any, { name: 'tasks' });
	}
}
