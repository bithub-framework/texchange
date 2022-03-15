import {
	Length,
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import assert = require('assert');
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';


export class DefaultSettle<H extends HLike<H>> extends Settle<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: StatefulModels<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: TasksLike<H>,
	) { super(); }

	protected clearingMargin(
		length: Length, profit: H,
	): H {
		// 默认逐仓
		return this.models.margins.getMargin()[length]
			.plus(profit);
	}

	protected assertEnoughBalance(): void {
		// 默认逐仓
		for (const length of [Length.SHORT, Length.LONG])
			assert(this.models.margins.getMargin()[length].gte(0));
	}
}
