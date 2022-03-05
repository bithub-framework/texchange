import {
	Length, Operation,
	OpenOrder,
} from 'interfaces';
import { Frozen } from './frozon';
import Big from 'big.js';
import { Context } from '../../context';
import { Makers } from '../makers';



export class DefaultMakers extends Makers {
	constructor(
		protected readonly context: Context,
	) { super(); }

	protected toFreeze(
		order: OpenOrder,
	): Frozen {
		// 默认单向持仓模式
		const length: Length = order.side * Operation.OPEN;
		return {
			balance: {
				[length]: this.context.config.dollarVolume(order.price, order.unfilled),
				[-length]: new Big(0),
			},
			position: Frozen.ZERO.position,
		};
	}
}
