import {
	Operation,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Frozen } from '../../interfaces/frozen';
import { Context } from '../../context';
import { Makers } from './makers';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/default/types';


export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	public constructor(
		@inject(TYPES.context)
		context: Context<H>,
	) { super(context); }

	/**
	 * 默认单向持仓模式
	 */
	protected toFreeze(order: OpenOrder<H>): Frozen<H> {
		if (order.operation === Operation.OPEN)
			return {
				balance: {
					[order.length]: this.context.calc.dollarVolume(order.price, order.unfilled),
					[-order.length]: new this.context.Data.H(0),
				},
				position: this.context.Data.Frozen.ZERO.position,
			};
		else
			return {
				balance: this.context.Data.Frozen.ZERO.balance,
				position: {
					[order.length]: order.unfilled,
					[-order.length]: new this.context.Data.H(0),
				},
			};
	}
}
