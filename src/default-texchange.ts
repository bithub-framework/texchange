import { Texchange } from './texchange';
import { StatefulStartable } from 'startable';

import { Context } from './context';
import { Config } from './context.d/config';
import { Timeline } from 'interfaces';

import { Mtm } from './mark-to-market';
import { DefaultMtm } from './mark-to-market.d/default';

import { Models } from './models';
import { Assets } from './models.d/assets';
import { Margin } from './models.d/margin';
import { DefaultMargin } from './models.d/margin.d/default';
import { Makers } from './models.d/makers';
import { DefaultMakers } from './models.d/makers.d/default';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { DefaultPricing } from './models.d/pricing.d/default';

import { Broadcast } from './broadcast';

import { DefaultTasks } from './tasks';
import { TasksLike } from './tasks-like';

import { UseCases } from './use-cases';
import { AmendOrder } from './use-cases.d/amend-order';
import { CancelOrder } from './use-cases.d/cancel-order';
import { GetBalances as GetBalancesUseCase } from './use-cases.d/get-balances';
import { GetOpenOrders } from './use-cases.d/get-open-orders';
import { GetPositions as GetPositionsUseCase } from './use-cases.d/get-positions';
import { MakeOrder } from './use-cases.d/make-order';
import { UpdateOrderbook } from './use-cases.d/update-orderbook';
import { UpdateTrades } from './use-cases.d/update-trades';

import { Views } from './views';

import Big from 'big.js';


export class DefaultTexchange extends Texchange<Snapshot>{
	protected readonly context: Context;
	protected readonly mtm: Mtm | null;
	protected readonly models: Models;
	protected readonly broadcast: Broadcast;
	protected readonly tasks: TasksLike;
	protected readonly useCases: UseCases;
	protected readonly views: Views;
	protected readonly startable: StatefulStartable<Snapshot>;

	constructor(
		config: Config,
		timeline: Timeline,
	) {
		super();

		this.context = {
			config,
			timeline,
		}

		this.models = {
			assets: new Assets(this.context),
			margin: new DefaultMargin(this.context),
			makers: new DefaultMakers(this.context),
			book: new Book(this.context),
			pricing: new DefaultPricing(this.context, new Big(0)),
			progress: new Progress(this.context),
		};

		this.broadcast = new Broadcast();

		this.tasks = new DefaultTasks(this.context, this.models, this.broadcast);

		this.mtm = new DefaultMtm(this.context, this.models, this.tasks);

		this.useCases = {
			amendOrder: new AmendOrder(this.context, this.models, this.broadcast, this.tasks),
			cancelOrder: new CancelOrder(this.context, this.models, this.broadcast, this.tasks),
			getBalances: new GetBalancesUseCase(this.context, this.models, this.broadcast, this.tasks),
			getOpenOrders: new GetOpenOrders(this.context, this.models, this.broadcast, this.tasks),
			getPositions: new GetPositionsUseCase(this.context, this.models, this.broadcast, this.tasks),
			makeOrder: new MakeOrder(this.context, this.models, this.broadcast, this.tasks),
			updateOrderbook: new UpdateOrderbook(this.context, this.models, this.broadcast, this.tasks),
			updateTrades: new UpdateTrades(this.context, this.models, this.broadcast, this.tasks, this.mtm === null),
		};

		this.views = new Views(this.context, this.useCases);

		this.startable = new StatefulStartable(
			() => this.start(),
			() => this.stop(),
			() => this.capture(),
			snapshot => this.restore(snapshot),
		);
	}

	private capture(): Snapshot {
		return {
			assets: this.models.assets.capture(),
			margin: this.models.margin.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	private restore(snapshot: Snapshot): void {
		this.models.assets.restore(snapshot.assets);
		this.models.margin.restore(snapshot.margin);
		this.models.makers.restore(snapshot.makers);
		this.models.book.restore(snapshot.book);
		this.models.pricing.restore(snapshot.pricing);
		this.models.progress.restore(snapshot.progress);
	}

	private async start() {
		if (this.mtm)
			await this.mtm.startable.start(this.startable.stop);
	}

	private async stop() {
		if (this.mtm)
			await this.mtm.startable.stop();
	}
}

export namespace DefaultTexchange {
	export interface Snapshot {
		assets: Assets.Snapshot;
		margin: Margin.Snapshot;
		makers: Makers.Snapshot;
		book: Book.Snapshot;
		pricing: DefaultPricing.Snapshot;
		progress: Progress.Snapshot;
	}
}
import Snapshot = DefaultTexchange.Snapshot;
