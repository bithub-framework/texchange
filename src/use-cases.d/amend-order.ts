import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import {
	TexchangeAmendment,
	TexchangeOpenOrder,
	HLike,
} from 'interfaces';


export class AmendOrder<H extends HLike<H>>
	extends UseCase<H> {
	constructor(
		protected readonly context: Context<H>,
		protected readonly models: Models<H>,
		protected readonly broadcast: Broadcast<H>,
		protected readonly tasks: Tasks<H>,
	) { super(); }

	public amendOrder(amendment: TexchangeAmendment<H>): TexchangeOpenOrder<H> {
		const oldOrder = this.tasks.cancelOpenOrder.cancelOpenOrder(amendment);
		const newOrder: TexchangeOpenOrder<H> = {
			price: amendment.newPrice,
			filled: oldOrder.filled,
			unfilled: amendment.newUnfilled,
			quantity: amendment.newUnfilled.plus(oldOrder.filled),
			id: amendment.id,
			side: amendment.side,
			length: amendment.length,
			operation: amendment.operation,
		};
		this.tasks.validateOrder.validateOrder(newOrder);
		return this.tasks.makeOpenOrder.makeOpenOrder(newOrder);
	}
}
