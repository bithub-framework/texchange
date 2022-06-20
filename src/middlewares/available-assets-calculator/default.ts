import { AvailableAssetsCalculator } from './available-assets-calculator';
import {
	HLike,
	Length, Side, Operation,
} from 'secretary-like';

import { injextends } from '@zimtsui/injektor';


@injextends()
export class DefaultAvailableAssetsCalculator<H extends HLike<H>> extends AvailableAssetsCalculator<H> {
	// 默认单向持仓模式
	protected getFinalFrozenBalance(): H {
		const position = this.marginAssets.getPosition();
		const totalFrozen = this.makers.getTotalFrozen();
		const totalUnfilled = this.makers.getTotalUnfilled();
		const $final: { [length: number]: H; } = {};
		for (const length of [Length.LONG, Length.SHORT]) {
			const side: Side = length * Operation.OPEN;
			const afterDeduction = this.context.Data.H.max(
				totalUnfilled[side].minus(position[-length]),
				new this.context.Data.H(0),
			);
			$final[length] = totalFrozen.balance[length]
				.times(afterDeduction)
				.div(totalUnfilled[side]);
		}
		return $final[Length.LONG].plus($final[Length.SHORT]);
	}
}
