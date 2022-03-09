import { ModelsStatic } from './models/models-static';
import { Context } from './context';
import { TasksLike } from './tasks/tasks-like';
import { Broadcast } from './broadcast';

export abstract class Task {
	protected abstract readonly context: Context;
	protected abstract readonly models: ModelsStatic;
	protected abstract readonly broadcast: Broadcast;
	protected abstract readonly tasks: TasksLike;
}
