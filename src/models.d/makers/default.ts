import {
	Action, Length,
	HLike,
	OpenOrder,
	Position,
} from 'secretary-like';
import { Frozen } from '../../interfaces/frozen';
import { Balance } from '../../interfaces/balance';
import { Makers } from './makers';

import { injextends } from '@zimtsui/injektor';



@injextends()
export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	// 默认单向持仓模式
	protected toFreeze(order: OpenOrder<H>): Frozen<H> {
		if (order.action === Action.OPEN) {
			const balance = new Balance<H>(
				this.context.Data.hFactory.from(0),
				this.context.Data.hFactory.from(0),
			);
			balance.set(
				order.length,
				this.marketSpec.dollarVolume(order.price, order.unfilled),
			);
			balance.set(
				Length.invert(order.length),
				this.context.Data.hFactory.from(0),
			);
			return {
				balance,
				position: this.context.Data.Frozen.ZERO.position,
			};
		} else {
			const position = new Position<H>(
				this.context.Data.hFactory.from(0),
				this.context.Data.hFactory.from(0),
			);
			position.set(
				order.length,
				order.unfilled,
			);
			position.set(
				Length.invert(order.length),
				this.context.Data.hFactory.from(0),
			);
			return {
				balance: this.context.Data.Frozen.ZERO.balance,
				position: position,
			};
		}
	}
}
