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
			const balance = this.vMCTX.DataTypes.balanceFactory.create({
				[Length.LONG]: this.vMCTX.DataTypes.hFactory.from(0),
				[Length.SHORT]: this.vMCTX.DataTypes.hFactory.from(0),
			});
			balance[order.length] = this.marketSpec
				.dollarVolume(order.price, order.unfilled)
				.div(this.accountSpec.LEVERAGE, this.marketSpec.CURRENCY_SCALE);
			balance[Length.invert(order.length)] = this.vMCTX.DataTypes.hFactory.from(0);
			return this.vMCTX.DataTypes.frozenFactory.create({
				balance,
				position: this.vMCTX.DataTypes.Frozen.ZERO.position,
			});
		} else {
			const position = this.vMCTX.DataTypes.positionFactory.create({
				[Length.LONG]: this.vMCTX.DataTypes.hFactory.from(0),
				[Length.SHORT]: this.vMCTX.DataTypes.hFactory.from(0),
			});
			position[order.length] = order.unfilled;
			position[Length.invert(order.length)] = this.vMCTX.DataTypes.hFactory.from(0);
			return this.vMCTX.DataTypes.frozenFactory.create({
				balance: this.vMCTX.DataTypes.Frozen.ZERO.balance,
				position: position,
			});
		}
	}
}
