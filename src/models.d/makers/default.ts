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
			const balance: Balance<H> = {
				[Length.LONG]: this.context.DataTypes.hFactory.from(0),
				[Length.SHORT]: this.context.DataTypes.hFactory.from(0),
			};
			balance[order.length] = this.marketSpec.dollarVolume(order.price, order.unfilled);
			balance[Length.invert(order.length)] = this.context.DataTypes.hFactory.from(0);
			return {
				balance,
				position: this.context.DataTypes.Frozen.ZERO.position,
			};
		} else {
			const position: Position<H> = {
				[Length.LONG]: this.context.DataTypes.hFactory.from(0),
				[Length.SHORT]: this.context.DataTypes.hFactory.from(0),
			};
			position[order.length] = order.unfilled;
			position[Length.invert(order.length)] = this.context.DataTypes.hFactory.from(0);
			return {
				balance: this.context.DataTypes.Frozen.ZERO.balance,
				position: position,
			};
		}
	}
}
