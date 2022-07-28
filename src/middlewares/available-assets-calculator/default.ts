import { AvailableAssetsCalculator } from './available-assets-calculator';
import {
	HLike,
	Length, Side, Action,
} from 'secretary-like';
import { Balance } from '../../data-types/balance';

import { injextends } from '@zimtsui/injektor';


@injextends()
export class DefaultAvailableAssetsCalculator<H extends HLike<H>> extends AvailableAssetsCalculator<H> {
	// 默认单向持仓模式
	protected getFinalFrozenBalance(): H {
		const position = this.marginAssets.getPosition();
		const totalFrozen = this.makers.getTotalFrozen();
		const totalUnfilled = this.makers.getTotalUnfilled();
		const $final = new Balance<H>(
			this.context.dataTypes.hFactory.from(0),
			this.context.dataTypes.hFactory.from(0),
		);
		for (const length of [Length.LONG, Length.SHORT]) {
			const side = Side.from(length, Action.OPEN);
			const afterDeduction = this.context.dataTypes.H.max(
				totalUnfilled.get(side).minus(position.get(Length.invert(length))),
				this.context.dataTypes.hFactory.from(0),
			);
			$final.set(
				length,
				totalUnfilled.get(side).neq(0)
					? totalFrozen.balance.get(length)
						.times(afterDeduction)
						.div(totalUnfilled.get(side))
					: this.context.dataTypes.hFactory.from(0),
			);
		}
		return $final.get(Length.LONG).plus($final.get(Length.SHORT));
	}
}
