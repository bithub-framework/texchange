import {
	Length,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { Models } from '../../models';
import assert = require('assert');
import { TasksLike } from '../../tasks-like';
import { Broadcast } from '../../broadcast';
import { Settle } from '../settle';


export class DefaultSettle extends Settle {
	constructor(
		protected readonly context: Context,
		protected readonly models: Models,
		protected readonly broadcast: Broadcast,
		protected readonly tasks: TasksLike,
	) { super(); }

	protected clearingMargin(
		length: Length, profit: Big,
	): Big {
		// 默认逐仓
		return this.models.margin[length]
			.plus(profit);
	}

	protected assertEnoughBalance(): void {
		// 默认逐仓
		for (const length of [Length.SHORT, Length.LONG])
			assert(this.models.margin[length].gte(0));
	}
}
