import { Startable } from 'startable';
import { Context } from '../context';
import { Mtm } from './mtm';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';


/**
 * 默认永不结算
 */
export class DefaultMtm<H extends HLike<H>>
	extends Mtm<H> {
	public readonly startable = Startable.create(
		() => this.start(),
		() => this.stop(),
	);

	public constructor(
		context: Context<H>,
		protected models: DefaultMtm.ModelDeps<H>,
		broadcast: Broadcast<H>,
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
	export interface TaskDeps<H extends HLike<H>>
		extends Mtm.TaskDeps<H> { }
}
