import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Models } from '../models/models';

import { Mtm, DefaultMtm } from './mtm';
import { Clearing } from './clearing';
import { Taking } from './taking';
import { Taken } from './taken';
import { Making } from './making';
import { Validation } from './validation';
import { AccountView } from './account-view';

export class Scheduler extends EventEmitter {
	protected mtm: Mtm;
	protected clearing: Clearing;
	private making: Making;
	private taking: Taking;
	private taken: Taken;
	private accountView: AccountView;
	private validation: Validation;

	constructor(
		context: Context,
		models: Models,
	) {
		super();
		this.taking = new Taking(context, models);
		this.making = new Making(context, models);
		this.taken = new Taken(context, models);
		this.clearing = new Clearing(context, models);
		this.mtm = new DefaultMtm(context, models, this.clearing);
		this.accountView = new AccountView(context, models);
		this.validation = new Validation(context, models, this.accountView);
	}
}
