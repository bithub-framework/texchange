import {
	Action, Length,
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Frozen } from '../../data-types/frozen';
import { Makers } from './makers';

import { injextends } from '@zimtsui/injektor';


@injextends()
export class DefaultMakers<H extends HLike<H>> extends Makers<H> {
	// 默认单向持仓模式
	protected toFreeze(order: OpenOrder<H>): Frozen<H> {
		if (order.action === Action.OPEN) {
			const balance = this.vmctx.DataTypes.balanceFactory.create({
				[Length.LONG]: this.vmctx.DataTypes.hFactory.from(0),
				[Length.SHORT]: this.vmctx.DataTypes.hFactory.from(0),
			});
			balance[order.length] = this.marketSpec
				.dollarVolume(order.price, order.unfilled)
				.div(this.accountSpec.LEVERAGE, this.marketSpec.CURRENCY_SCALE);
			balance[Length.invert(order.length)] = this.vmctx.DataTypes.hFactory.from(0);
			return this.vmctx.DataTypes.frozenFactory.create({
				balance,
				position: this.vmctx.DataTypes.Frozen.ZERO.position,
			});
		} else {
			const position = this.vmctx.DataTypes.positionFactory.create({
				[Length.LONG]: this.vmctx.DataTypes.hFactory.from(0),
				[Length.SHORT]: this.vmctx.DataTypes.hFactory.from(0),
			});
			position[order.length] = order.unfilled;
			position[Length.invert(order.length)] = this.vmctx.DataTypes.hFactory.from(0);
			return this.vmctx.DataTypes.frozenFactory.create({
				balance: this.vmctx.DataTypes.Frozen.ZERO.balance,
				position: position,
			});
		}
	}
}
