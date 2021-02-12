import { Task } from './Task';
import { Store } from '@sapphire/framework';

export class TaskStore extends Store<Task> {
	public constructor() {
		super(Task as any, { name: 'tasks' });
	}
}
