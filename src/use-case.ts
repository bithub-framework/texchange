import { StatefulModels } from './models/stateful-models';
import { TasksLike } from './tasks/tasks-like';
import { Context } from './context';

export abstract class UseCase {
	protected abstract readonly context: Context;
	protected abstract readonly models: StatefulModels;
	protected abstract readonly tasks: TasksLike;
}
