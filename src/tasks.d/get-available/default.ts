import {
	Side, Length, Operation,
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Tasks } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
import { max } from '../../utilities';
import { GetAvailable } from './get-available';



export class DefaultGetAvailable<H extends HLike<H>>
	extends GetAvailable<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	protected finalMargin(): H {
		// 默认无锁仓优惠
		// 默认非实时结算
		const margin = this.models.margins.getMargin();
		return margin[Length.LONG]
			.plus(margin[Length.SHORT]);
	}

	protected finalFrozenBalance(): H {
		// 默认单向持仓模式
		const position = this.models.assets.getPosition();
		const totalFrozen = this.models.makers.getTotalFrozen();
		const totalUnfilled = this.models.makers.getTotalUnfilled();
		const final: { [length: number]: H; } = {};
		for (const length of [Length.LONG, Length.SHORT]) {
			const side: Side = length * Operation.OPEN;
			const afterDeduction = max(
				totalUnfilled[side].minus(position[-length]),
				this.context.H.from(0),
			);
			final[length] = totalFrozen.balance[length]
				.times(afterDeduction)
				.div(totalUnfilled[side]);
		}
		return final[Length.LONG].plus(final[Length.SHORT]);
	}
}
