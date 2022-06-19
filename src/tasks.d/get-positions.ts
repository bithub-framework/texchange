import { Context } from '../context';
import {
	Positions,
	HLike,
} from 'secretary-like';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Assets } from '../models.d/assets';
import { TaskGetClosable } from './get-closable';


export class TaskGetPositions<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	private tasks!: TaskGetPositions.TaskDeps<H>;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.models)
		private models: TaskGetPositions.ModelDeps<H>,
	) { }

	public getPositions(): Positions<H> {
		return {
			position: this.models.assets.getPosition(),
			closable: this.tasks.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}

export namespace TaskGetPositions {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		getClosable: TaskGetClosable<H>;
	}
}
