import { Context } from './context';
import {
	HLike,
	MarketCalc,
} from 'interfaces';

import { DefaultMarketCalc } from '../context.d/market-calc/default';

export class DefaultContext<H extends HLike<H>>
	extends Context<H>{

	public calc: MarketCalc<H> = new DefaultMarketCalc();
}
