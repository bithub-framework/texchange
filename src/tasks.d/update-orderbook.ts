import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import {
	Orderbook,
} from '../interfaces';
import { ModelLike } from '../models.d/model';
import { initializeStages } from '../initialize-stages';
import assert = require('assert');
import { Broadcast } from '../context.d/broadcast';


type OwnInvolved = Pick<Models, 'book'>;

export class UpdateOrderbook {
	private involved: ModelLike[] = [this.models.book];

	constructor(
		private context: Context,
		private models: OwnInvolved,
		private controllers: Controllers,
	) { }

	public updateOrderbook(orderbook: Readonly<Orderbook>): void {
		initializeStages(this.involved);
		assert(orderbook.time === this.context.timeline.now());
		this.models.book.setBasebook(orderbook);
		this.context.broadcast.emit('orderbook', this.models.book.getBook());

		this.models.book.stage = true;
	}
}
