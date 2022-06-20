import {
	Balances,
	HLike,
} from 'secretary-like';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseGetBalances<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
	) { }

	public getBalances(): Balances<H> {
		return this.calculator.getBalances();
	}
}
