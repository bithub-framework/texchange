import {
	Length,
	JsonCompatible,
	ReadonlyRecur,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { Assets } from '../assets';
import { Margin } from '../margin';



/**
 * 默认非实时结算
 */
export class DefaultMargin extends Margin {
	constructor(
		protected context: Context,
	) { super(); }

	protected marginIncrement(
		length: Length, volume: Big, dollarVolume: Big,
	): Big {
		return dollarVolume.div(this.context.config.LEVERAGE);
	}

	protected marginDecrement(
		oldAssets: Assets,
		length: Length, volume: Big, dollarVolume: Big,
	): Big {
		return this[length]
			.times(volume)
			.div(oldAssets.position[length]);
	}

}
