import { Store } from '@sapphire/framework';
import { Task } from './Task';

export class TaskStore extends Store<Task> {
	public constructor() {
		super(Task as any, { name: 'tasks' });
	}
}
