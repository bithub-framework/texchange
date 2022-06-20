import {
	Operation,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Frozen } from '../../interfaces/frozen';
import { Makers } from './makers';

import { injextends } from '@zimtsui/injektor';



@injextends()
export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	/**
	 * 默认单向持仓模式
	 */
	protected toFreeze(order: OpenOrder<H>): Frozen<H> {
		if (order.operation === Operation.OPEN)
			return {
				balance: {
					[order.length]: this.marketSpec.dollarVolume(order.price, order.unfilled),
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
