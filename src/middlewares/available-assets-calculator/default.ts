import { AvailableAssetsCalculator } from './available-assets-calculator';
import {
	HLike,
	Length, Side, Action,
} from 'secretary-like';

import { injextends } from '@zimtsui/injektor';


@injextends()
export class DefaultAvailableAssetsCalculator<H extends HLike<H>> extends AvailableAssetsCalculator<H> {
	// 默认单向持仓模式
	protected getFinalFrozenBalance(): H {
		const position = this.marginAssets.getPosition();
		const totalFrozen = this.makers.getTotalFrozen();
		const totalUnfilled = this.makers.getTotalUnfilled();
		const $final = this.context.DataTypes.balanceFactory.new({
			[Length.LONG]: this.context.DataTypes.hFactory.from(0),
			[Length.SHORT]: this.context.DataTypes.hFactory.from(0),
		});
		for (const length of [Length.LONG, Length.SHORT]) {
			const side = Side.from(length, Action.OPEN);
			const afterDeduction = this.context.DataTypes.H.max(
				totalUnfilled[side].minus(position[Length.invert(length)]),
				this.context.DataTypes.hFactory.from(0),
			);
			$final[length] = totalUnfilled[side].neq(0)
				? totalFrozen.balance[length]
					.times(afterDeduction)
					.div(totalUnfilled[side], this.marketSpec.CURRENCY_SCALE)
				: this.context.DataTypes.hFactory.from(0);
		}
		return $final[Length.LONG].plus($final[Length.SHORT]);
	}
}
