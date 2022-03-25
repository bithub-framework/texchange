import { Context } from '../../context/context';
import {
	Positions,
	HLike,
	Length,
} from 'interfaces';
import { GetPositionsLike } from './get-positions-like';
import { Broadcast } from '../../broadcast';

import { Assets } from '../../models.d/assets';
import { GetClosableLike } from '../get-closable/get-closable-like';


export class GetPositions<H extends HLike<H>>
	implements GetPositionsLike<H> {
	public constructor(
		protected context: Context<H>,
		protected models: GetPositions.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: GetPositions.TaskDeps<H>,
	) { }

	public getPositions(): Positions<H> {
		return {
			position: this.models.assets.getPosition(),
			closable: this.tasks.getClosable.getClosable(),
			time: this.context.timeline.now(),
		};
	}
}

export namespace GetPositions {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
	}

	export interface TaskDeps<H extends HLike<H>> {
		getClosable: GetClosableLike<H>;
	}
}
