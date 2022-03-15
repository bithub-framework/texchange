import { Startable } from 'startable';
import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { TasksLike } from '../tasks/tasks-like';
import { Mtm } from './mtm';
import { HLike } from 'interfaces';


/**
 * 默认永不结算
 */
export class DefaultMtm<H extends HLike<H>>
	extends Mtm<H> {
	public readonly startable = new Startable(
		() => this.start(),
		() => this.stop(),
	);

	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	private async start(): Promise<void> { }
	private async stop(): Promise<void> { }
}
