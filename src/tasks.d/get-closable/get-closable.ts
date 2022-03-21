import {
	Length,
	Closable,
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import { Task } from '../../task';
import { GetClosableLike } from './get-closable-like';
import { Broadcast } from '../../broadcast';

import { Assets } from '../../models.d/assets';
import { Makers } from '../../models.d/makers';


export class GetClosable<H extends HLike<H>> extends Task<H>
	implements GetClosableLike<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: GetClosable.ModelDeps<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: GetClosable.TaskDeps<H>,
	) { super(); }

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

export namespace GetClosable {
	export interface ModelDeps<H extends HLike<H>>
		extends Task.ModelDeps<H> {
		assets: Assets<H>;
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends Task.TaskDeps<H> { }
}
