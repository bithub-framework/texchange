import {
	Length,
	HLike,
} from 'interfaces';
import { Context } from '../../context';
import assert = require('assert');
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';


/**
* 默认逐仓
*/
export class DefaultSettle<H extends HLike<H>>
	extends Settle<H> {

	public constructor(
		protected tasks: DefaultSettle.TaskDeps<H>,

		context: Context<H>,
		protected models: DefaultSettle.ModelDeps<H>,
		broadcast: Broadcast<H>,
	) {
		super(
			context,
			models,
			broadcast,
		);
	}


	protected clearingMargin(
		length: Length, profit: H,
	): H {

		return this.models.margins.getMargin()[length]
			.plus(profit);
	}

	protected assertEnoughBalance(): void {
		for (const length of [Length.SHORT, Length.LONG])
			assert(this.models.margins.getMargin()[length].gte(0));
	}
}

export namespace DefaultSettle {
	export interface ModelDeps<H extends HLike<H>>
		extends Settle.ModelDeps<H> { }

	export interface TaskDeps<H extends HLike<H>>
		extends Settle.TaskDeps<H> { }
}
