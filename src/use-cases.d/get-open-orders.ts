import { Context } from '../context';
import { Broadcast } from '../broadcast';
import {
	HLike,
	OpenOrder,
} from 'secretary-like';

import { Makers } from '../models.d/makers/makers';


export class GetOpenOrders<H extends HLike<H>> {
	public constructor(
		protected context: Context<H>,
		protected models: GetOpenOrders.ModelDeps<H>,
		protected broadcast: Broadcast<H>,
		protected tasks: GetOpenOrders.TaskDeps<H>,
	) { }

	public getOpenOrders(): OpenOrder<H>[] {
		return [...this.models.makers];
	}
}

export namespace GetOpenOrders {
	export interface ModelDeps<H extends HLike<H>> {
		makers: Makers<H>;
	}

	export interface TaskDeps<H extends HLike<H>> { }
}
