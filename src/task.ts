import { StatefulModels } from './models/stateful-models';
import { Context } from './context';
import { TasksLike } from './tasks/tasks-like';
import { Broadcast } from './broadcast';
import { HLike } from 'interfaces';


export abstract class Task<H extends HLike<H>> {
	protected abstract readonly context: Context<H>;
	protected abstract readonly models: StatefulModels<H>;
	protected abstract readonly broadcast: Broadcast<H>;
	protected abstract readonly tasks: TasksLike<H>;
}
