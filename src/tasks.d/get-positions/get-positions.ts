import { Context } from '../../context';
import {
	Positions,
	HLike,
	Length,
} from 'interfaces';
import { Task } from '../../task';
import { GetPositionsLike } from './get-positions-like';
import { Broadcast } from '../../broadcast';

import { Assets } from '../../models.d/assets';
import { GetClosableLike } from '../get-closable/get-closable-like';


export class GetPositions<H extends HLike<H>> extends Task<H>
	implements GetPositionsLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: GetPositions.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: GetPositions.TaskDeps<H>,
	) { super(); }

	public getPositions(): Positions<H> {
		return {
			position: {
				[Length.LONG]: this.models.assets.getPosition()[Length.LONG],
				[Length.SHORT]: this.models.assets.getPosition()[Length.SHORT],
			},
			closable: this.tasks.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}

export namespace GetPositions {
	export interface ModelDeps<H extends HLike<H>>
		extends Task.ModelDeps<H> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends Task.TaskDeps<H> {
		getClosable: GetClosableLike<H>;
	}
}
