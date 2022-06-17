import { Startable } from 'startable';
import { Context } from '../context';
import { Mtm } from './mtm';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


/**
 * 默认永不结算
 */
export class DefaultMtm<H extends HLike<H>>
	extends Mtm<H> {

	public constructor(
		@inject(TYPES.context)
		context: Context<H>,
		@inject(TYPES.models)
		protected models: DefaultMtm.ModelDeps<H>,
		@inject(TYPES.broadcast)
		broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		protected tasks: DefaultMtm.TaskDeps<H>,
	) {
		super(
			context,
			models,
			broadcast,
			tasks,
		);
	}

	protected async rawStart(): Promise<void> { }
	protected async rawStop(): Promise<void> { }
}

export namespace DefaultMtm {
	export interface ModelDeps<H extends HLike<H>>
		extends Mtm.ModelDeps<H> { }
	export const ModelDeps = {};
	export interface TaskDeps<H extends HLike<H>>
		extends Mtm.TaskDeps<H> { }
	export const TaskDeps = {};
}
