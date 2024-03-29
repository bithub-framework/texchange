import {
	HLike,
	OpenOrder,
} from 'secretary-like';
import { Makers } from '../models.d/makers/makers';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';



export class UseCaseGetOpenOrders<H extends HLike<H>> {
	public constructor(
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
	) { }

	public getOpenOrders(): OpenOrder<H>[] {
		return [...this.makers];
	}
}
