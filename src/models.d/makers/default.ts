import {
	Length, Operation,
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';
import { Frozen } from './frozon';
import { Context } from '../../context/context';
import { Makers } from './makers';



export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	public constructor(
		protected readonly context: Context<H>,
	) { super(context); }

	protected toFreeze(
		order: TexchangeOpenOrder<H>,
	): Frozen<H> {
		// 默认单向持仓模式
		const length: Length = order.side * Operation.OPEN;
		return {
			balance: {
				[length]: this.context.calc.dollarVolume(order.price, order.unfilled),
				[-length]: this.context.H.from(0),
			},
			position: this.Frozen.ZERO.position,
		};
	}
}
