import {
	Side, Length, Operation,
	HLike,
} from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { GetAvailable } from './get-available';

import { Margins } from '../../models.d/margins';
import { Makers } from '../../models.d/makers/makers';


export class DefaultGetAvailable<H extends HLike<H>>
	extends GetAvailable<H> {

	public constructor(
		protected tasks: DefaultGetAvailable.TaskDeps<H>,

		context: Context<H>,
		protected models: DefaultGetAvailable.ModelDeps<H>,
		broadcast: Broadcast<H>,
	) {
		super(
			context,
			models,
			broadcast,
		);
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
		extends GetAvailable.ModelDeps<H> {
		margins: Margins<H>;
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>>
		extends GetAvailable.TaskDeps<H> { }
}
