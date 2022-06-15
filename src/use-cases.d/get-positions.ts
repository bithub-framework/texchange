import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Positions,
	HLike,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Assets } from '../models.d/assets';
import { TaskGetClosable } from '../tasks.d/get-closable';

export class UseCaseGetPositions<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.models)
		protected models: UseCaseGetPositions.ModelDeps<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
		@inject(TYPES.tasks)
		protected tasks: UseCaseGetPositions.TaskDeps<H>,
	) { }

	public getPositions(): Positions<H> {
		return {
			position: this.models.assets.getPosition(),
			closable: this.tasks.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}

export namespace UseCaseGetPositions {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		getClosable: TaskGetClosable<H>;
	}
}
