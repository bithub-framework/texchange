import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	Positions,
	HLike,
} from 'secretary-like';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Assets } from '../models.d/margin-assets/assets';
import { TaskGetPositions } from '../tasks.d/get-positions';

export class UseCaseGetPositions<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.tasks)
		private tasks: UseCaseGetPositions.TaskDeps<H>,
	) { }

	public getPositions(): Positions<H> {
		return this.tasks.getPositions.getPositions();
	}
}

export namespace UseCaseGetPositions {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		getPositions: TaskGetPositions<H>;
	}
}
