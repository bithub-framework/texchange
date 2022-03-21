import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	Positions,
	Length,
	HLike,
} from 'interfaces';

import { Assets } from '../models.d/assets';
import { GetClosableLike } from '../tasks.d/get-closable/get-closable-like';

export class GetPositions<H extends HLike<H>>
	extends UseCase<H> {
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
		extends UseCase.ModelDeps<H> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends UseCase.TaskDeps<H> {
		getClosable: GetClosableLike<H>;
	}
}
