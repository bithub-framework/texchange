import { Startable } from 'startable';
import { Context } from '../context';
import { Mtm } from './mtm';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { inject } from 'injektor';


/**
 * 默认永不结算
 */
export class DefaultMtm<H extends HLike<H>>
	extends Mtm<H> {
	public startable = new Startable(
		() => this.start(),
		() => this.stop(),
	);

	public constructor(
		@inject(Context)
		context: Context<H>,
		@inject(DefaultMtm.ModelDeps)
		protected models: DefaultMtm.ModelDeps<H>,
		@inject(Broadcast)
		broadcast: Broadcast<H>,
		@inject(DefaultMtm.TaskDeps)
		protected tasks: DefaultMtm.TaskDeps<H>,
	) {
		super(
			context,
			models,
			broadcast,
			tasks,
		);
	}

	private async start(): Promise<void> { }
	private async stop(): Promise<void> { }
}

export namespace DefaultMtm {
	export interface ModelDeps<H extends HLike<H>>
		extends Mtm.ModelDeps<H> { }
	export const ModelDeps = {};
	export interface TaskDeps<H extends HLike<H>>
		extends Mtm.TaskDeps<H> { }
	export const TaskDeps = {};
}
