import {
	Length,
	Closable,
	HLike,
} from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { inject, instantInject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';

import { Assets } from '../models.d/assets';
import { Makers } from '../models.d/makers/makers';


export class TaskGetClosable<H extends HLike<H>> {
	@instantInject(TYPES.tasks)
	private tasks!: TaskGetClosable.TaskDeps<H>;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.models)
		private models: TaskGetClosable.ModelDeps<H>,
		@inject(TYPES.broadcast)
		private broadcast: Broadcast<H>,
	) { }

	public getClosable(): Closable<H> {
		const { assets, makers } = this.models;
		const totalFrozen = makers.getTotalFrozen();
		const position = assets.getPosition();
		return {
			[Length.LONG]: position[Length.LONG]
				.minus(totalFrozen.position[Length.LONG]),
			[Length.SHORT]: position[Length.SHORT]
				.minus(totalFrozen.position[Length.SHORT]),
		};
	}
}

export namespace TaskGetClosable {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
