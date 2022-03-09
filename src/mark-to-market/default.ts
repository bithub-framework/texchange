import { Startable } from 'startable';
import { Context } from '../context';
import { ModelsStatic } from '../models/models-static';
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
		protected readonly models: ModelsStatic,
		protected readonly tasks: TasksLike,
	) { super(); }

	private async start(): Promise<void> { }
	private async stop(): Promise<void> { }
}
