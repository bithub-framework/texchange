import {
	PositionsLike,
	HLike,
} from 'secretary-like';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class UseCaseGetPositions<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MIDDLEWARES.availableAssetsCalculator)
		private calculator: AvailableAssetsCalculator<H>,
	) { }

	public getPositions(): PositionsLike<H> {
		return this.calculator.getPositions();
	}
}
