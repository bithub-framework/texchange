import {
	Operation,
	HLike,
	OpenOrder,
} from 'interfaces';
import { Frozen } from './frozen';
import { Context } from '../../context';
import { Makers } from './makers';
import { inject } from 'injektor';


export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	public constructor(
		@inject(Context)
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
					[-order.length]: new this.context.H(0),
				},
				position: this.Frozen.ZERO.position,
			};
		else
			return {
				balance: this.Frozen.ZERO.balance,
				position: {
					[order.length]: order.unfilled,
					[-order.length]: new this.context.H(0),
				},
			};
	}
}
