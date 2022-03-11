import { Startable } from 'startable';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { TasksLike } from '../tasks/tasks-like';
import { Mtm } from './mtm';


/**
 * 默认永不结算
 */
export class DefaultMtm extends Mtm {
	public readonly startable = new Startable(
		() => this.start(),
		() => this.stop(),
	);

	constructor(
		protected readonly context: Context,
		protected readonly models: StatefulModels,
		protected readonly tasks: TasksLike,
	) { super(); }

	private async start(): Promise<void> { }
	private async stop(): Promise<void> { }
}
