import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { Broadcast } from '../broadcast';

export abstract class Task {
	protected abstract context: Context;
	protected abstract models: Models;
	protected abstract broadcast: Broadcast;
	protected abstract tasks: TasksLike;
}
