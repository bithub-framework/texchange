import { Startable } from 'startable';
import { Context } from '../context';
import { Mtm } from './mtm';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';

import { inject } from 'injektor';
import { TYPES } from '../injection/types';


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
		@inject(TYPES.Context)
		context: Context<H>,
		@inject(TYPES.Models)
		protected models: DefaultMtm.ModelDeps<H>,
		@inject(TYPES.Broadcast)
		broadcast: Broadcast<H>,
		@inject(TYPES.Tasks)
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
