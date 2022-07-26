import { AvailableAssetsCalculator } from './available-assets-calculator';
import {
	HLike,
	Length, Side, Action,
} from 'secretary-like';
import { FrozenBalance } from '../../interfaces/frozen/frozen-balance';

import { injextends } from '@zimtsui/injektor';


@injextends()
export class DefaultAvailableAssetsCalculator<H extends HLike<H>> extends AvailableAssetsCalculator<H> {
	// 默认单向持仓模式
	protected getFinalFrozenBalance(): H {
		const position = this.marginAssets.getPosition();
		const totalFrozen = this.makers.getTotalFrozen();
		const totalUnfilled = this.makers.getTotalUnfilled();
		const $final = new FrozenBalance<H>(
			this.context.Data.H.from(0),
			this.context.Data.H.from(0),
		);
		for (const length of [Length.LONG, Length.SHORT]) {
			const side = Side.from(length, Action.OPEN);
			const afterDeduction = this.context.Data.H.max(
				totalUnfilled.get(side).minus(position.get(Length.invert(length))),
				this.context.Data.H.from(0),
			);
			$final.set(
				length,
				totalUnfilled.get(side).neq(0)
					? totalFrozen.balance.get(length)
						.times(afterDeduction)
						.div(totalUnfilled.get(side))
					: this.context.Data.H.from(0),
			);
		}
		return $final.get(Length.LONG).plus($final.get(Length.SHORT));
	}
}
