import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	Orderbook,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from './initialize-stages';
import { EventEmitter } from 'events';
import assert = require('assert');



export class UpdateOrderbook extends EventEmitter {
	private involved: ModelLike[] = [this.models.book];

	constructor(
		private context: Context,
		private models: Models,
		private controllers: Controllers,
	) { super(); }

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		initializeStages(this.involved);
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.emit('pushOrderbook');

		this.models.book.stage = true;
	}
}
