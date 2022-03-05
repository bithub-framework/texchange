import { Models } from '../models';
import { Context } from '../context';
import { TasksLike } from '../tasks-like';
import { Broadcast } from '../broadcast';

export abstract class Task {
	protected abstract readonly context: Context;
	protected abstract readonly models: Models;
	protected abstract readonly broadcast: Broadcast;
	protected abstract readonly tasks: TasksLike;
}
