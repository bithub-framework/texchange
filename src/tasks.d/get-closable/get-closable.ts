import { instantInject } from 'injektor';
import {
	Length,
	Closable,
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import { GetClosableLike } from './get-closable-like';
import { Broadcast } from '../../broadcast';

import { Assets } from '../../models.d/assets';
import { Makers } from '../../models.d/makers/makers';


export class GetClosable<H extends HLike<H>>
	implements GetClosableLike<H> {
	public static TaskDeps = {};
	@instantInject(GetClosable.TaskDeps)
	private tasks!: GetClosable.TaskDeps<H>;

	public constructor(
		private context: Context<H>,
		private models: GetClosable.ModelDeps<H>,
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

export namespace GetClosable {
	export interface ModelDeps<H extends HLike<H>> {
		assets: Assets<H>;
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
