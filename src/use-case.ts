import { StatefulModels } from './models/stateful-models';
import { TasksLike } from './tasks/tasks-like';
import { Context } from './context';
import { HLike } from 'interfaces';


export abstract class UseCase<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected abstract readonly models: StatefulModels<H>;
	protected abstract readonly tasks: TasksLike<H>;
}
