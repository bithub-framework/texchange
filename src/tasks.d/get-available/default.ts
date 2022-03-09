import {
	Side,
	Length,
	Operation,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { ModelsStatic } from '../../models/models-static';
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { max } from '../../utilities';
import { GetAvailable } from './get-available';



export class DefaultGetAvailable extends GetAvailable {
	constructor(
		protected readonly context: Context,
		protected readonly models: ModelsStatic,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	protected finalMargin(): Big {
		// 默认无锁仓优惠
		// 默认非实时结算
		return this.models.margin[Length.LONG]
			.plus(this.models.margin[Length.SHORT]);
	}

	protected finalFrozenBalance(): Big {
		// 默认单向持仓模式
		const { position } = this.models.assets;
		const { totalFrozen, totalUnfilledQuantity } = this.models.makers;
		const final: { [length: number]: Big; } = {};
		for (const length of [Length.LONG, Length.SHORT]) {
			const side: Side = length * Operation.OPEN;
			const afterDeduction = max(
				totalUnfilledQuantity[side].minus(position[-length]),
				new Big(0),
			);
			final[length] = totalFrozen.balance[length]
				.times(afterDeduction)
				.div(totalUnfilledQuantity[side]);
		}
		return final[Length.LONG].plus(final[Length.SHORT]);
	}
}
