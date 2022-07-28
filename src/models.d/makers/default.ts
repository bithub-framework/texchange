import {
	Action, Length,
	HLike,
	OpenOrder,
	Position,
} from 'secretary-like';
import { Frozen } from '../../data-types/frozen';
import { Balance } from '../../data-types/balance';
import { Makers } from './makers';

import { injextends } from '@zimtsui/injektor';



@injextends()
export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	// 默认单向持仓模式
	protected toFreeze(order: OpenOrder<H>): Frozen<H> {
		if (order.action === Action.OPEN) {
			const balance = new Balance<H>(
				this.context.dataTypes.hFactory.from(0),
				this.context.dataTypes.hFactory.from(0),
			);
			balance.set(
				order.length,
				this.marketSpec.dollarVolume(order.price, order.unfilled),
			);
			balance.set(
				Length.invert(order.length),
				this.context.dataTypes.hFactory.from(0),
			);
			return {
				balance,
				position: this.context.dataTypes.Frozen.ZERO.position,
			};
		} else {
			const position = new Position<H>(
				this.context.dataTypes.hFactory.from(0),
				this.context.dataTypes.hFactory.from(0),
			);
			position.set(
				order.length,
				order.unfilled,
			);
			position.set(
				Length.invert(order.length),
				this.context.dataTypes.hFactory.from(0),
			);
			return {
				balance: this.context.dataTypes.Frozen.ZERO.balance,
				position: position,
			};
		}
	}
}
