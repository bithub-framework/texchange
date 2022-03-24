import { Startable } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Tasks } from '../tasks/tasks';
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

	public constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	private async start(): Promise<void> { }
	private async stop(): Promise<void> { }
}

export namespace DefaultMtm {
	export interface ModelDeps<H extends HLike<H>>
		extends Mtm.ModelDeps<H> { }
	export interface TaskDeps<H extends HLike<H>>
		extends Mtm.TaskDeps<H> { }
}
