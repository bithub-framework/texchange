import { EventEmitter } from 'events';
import { Context } from './context/context';
import { Models } from './models/models';
import { Mtm, DefaultMtm } from './controllers/mtm';
import { Clearing } from './controllers/clearing';
import { Taking } from './controllers/taking';
import { Taken } from './controllers/taken';
import { Making } from './controllers/making';
import { Validation } from './controllers/validation';
import { AccountView } from './controllers/account-view';
import { Ordering } from './controllers/ordering';
import {
	LimitOrder,
	OpenOrder,
	Amendment,
} from './interfaces';


export type Stages = {
	[model in keyof Models]: boolean;
}


export class Scheduler extends EventEmitter {
	protected mtm: Mtm;
	protected clearing: Clearing;
	private making: Making;
	private taking: Taking;
	private taken: Taken;
	private accountView: AccountView;
	private validation: Validation;
	private ordering: Ordering;
	private initialStages: Stages = {
		assets: false,
		margin: false,
		makers: false,
		progress: false,
		book: false,
		pricing: false,
	}
	private readonly stages: Stages = { ...this.initialStages };

	constructor(
		context: Context,
		models: Models,
	) {
		super();

		this.taking = new Taking(context, models, this.stages);
		this.making = new Making(context, models, this.stages);
		this.taken = new Taken(context, models, this.stages);
		this.clearing = new Clearing(context, models, this.stages);
		this.mtm = new DefaultMtm(context, models, this.stages, this.clearing);
		this.accountView = new AccountView(context, models, this.stages);
		this.validation = new Validation(context, models, this.stages, this.accountView);
		this.ordering = new Ordering(context, models, this.stages, this.validation, this.taking, this.making);
	}

	private initializeStages<Involved extends keyof Models>(involved: Involved[]): void {
		for (const modelName of involved)
			this.stages[modelName] = this.initialStages[modelName];
	}

	public makeOrder(order: Readonly<LimitOrder>): OpenOrder {
		const involved = [...Ordering.involved];
		this.initializeStages(involved);
		return this.ordering.makeOrder(order);
	}

	public cancelOrder(order: Readonly<OpenOrder>): OpenOrder {
		const involved = [...Ordering.involved];
		this.initializeStages(involved);
		return this.ordering.cancelOrder(order);
	}


	public amendOrder(amendment: Readonly<Amendment>): OpenOrder {
		const involved = [...Ordering.involved];
		this.initializeStages(involved);
		return this.ordering.amendOrder(amendment);
	}
}
