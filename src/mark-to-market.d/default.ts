import { Startable } from 'startable';
import { Context } from '../context';
import { Models } from '../models';
import { TasksLike } from '../tasks-like';
import { Mtm } from '../mark-to-market';


/**
 * 默认永不结算
 */
export class DefaultMtm extends Mtm {
	public startable = new Startable(
		() => this.start(),
		() => this.stop(),
	);

	constructor(
		protected context: Context,
		protected models: Models,
		protected tasks: TasksLike,
	) { super(); }

	private async start(): Promise<void> { }
	private async stop(): Promise<void> { }
}
