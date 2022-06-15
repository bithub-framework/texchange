import {
	Side, Length, Operation,
	HLike,
} from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { TaskGetAvailable } from './get-available';
import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';

import { Margins } from '../../models.d/margins';
import { Makers } from '../../models.d/makers/makers';


export class DefaultTaskGetAvailable<H extends HLike<H>>
	extends TaskGetAvailable<H> {

	public constructor(
		@inject(TYPES.context)
		protected context: Context<H>,
		@inject(TYPES.models)
		protected models: DefaultGetAvailable.ModelDeps<H>,
		@inject(TYPES.broadcast)
		protected broadcast: Broadcast<H>,
	) {
		super();
	}

	protected finalMargin(): H {
		// 默认无锁仓优惠
		const margin = this.models.margins.getMargin();
		return margin[Length.LONG]
			.plus(margin[Length.SHORT]);
	}

	protected finalFrozenBalance(): H {
		// 默认单向持仓模式
		const position = this.models.assets.getPosition();
		const totalFrozen = this.models.makers.getTotalFrozen();
		const totalUnfilled = this.models.makers.getTotalUnfilled();
		const $final: { [length: number]: H; } = {};
		for (const length of [Length.LONG, Length.SHORT]) {
			const side: Side = length * Operation.OPEN;
			const afterDeduction = this.context.Data.H.max(
				totalUnfilled[side].minus(position[-length]),
				new this.context.Data.H(0),
			);
			$final[length] = totalFrozen.balance[length]
				.times(afterDeduction)
				.div(totalUnfilled[side]);
		}
		return $final[Length.LONG].plus($final[Length.SHORT]);
	}
}

export namespace DefaultGetAvailable {
	export interface ModelDeps<H extends HLike<H>>
		extends TaskGetAvailable.ModelDeps<H> {
		margins: Margins<H>;
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends TaskGetAvailable.TaskDeps<H> { }
}
