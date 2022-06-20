import { Context } from '../context';
import {
	HLike,
	MarketSpec,
	AccountSpec,
} from 'secretary-like';
import { Startable, StartableLike } from 'startable';
import { StatefulLike } from '../stateful-like';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Pricing } from '../models.d/pricing/pricing';
import { Progress } from '../models.d/progress';
import { Mtm } from '../mark-to-market/mtm';
import { DatabaseOrderbook, DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../interfaces/database-trade';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class AdminFacade<H extends HLike<H>>
	implements StatefulLike<Snapshot>, StartableLike {

	private startable = Startable.create(
		() => this.rawStart(),
		() => this.rawStop(),
	);
	public start = this.startable.start;
	public stop = this.startable.stop;
	public assart = this.startable.assart;
	public starp = this.startable.starp;
	public getReadyState = this.startable.getReadyState;
	public skipStart = this.startable.skipStart;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.marketSpec)
		private marketSpec: MarketSpec<H>,
		@inject(TYPES.accountSpec)
		private accountSpec: AccountSpec,
		@inject(TYPES.MODELS.marginAssets)
		private marginAssets: MarginAssets<H>,
		@inject(TYPES.MODELS.book)
		private book: Book<H>,
		@inject(TYPES.MODELS.makers)
		private makers: Makers<H>,
		@inject(TYPES.MODELS.pricing)
		private pricing: Pricing<H, unknown>,
		@inject(TYPES.MODELS.progress)
		private progress: Progress<H>,
		@inject(TYPES.mtm)
		private mtm: Mtm<H> | null,
		@inject(TYPES.USE_CASES.updateTrades)
		private useCaseUpdateTrades: UseCaseUpdateTrades<H>,
		@inject(TYPES.USE_CASES.updateOrderbook)
		private useCaseUpdateOrderbook: UseCaseUpdateOrderbook<H>,
		@inject(TYPES.USE_CASES.getProgress)
		private useCaseGetProgress: UseCaseGetProgress<H>,
	) { }

	public getMarketSpec(): MarketSpec<H> {
		return this.marketSpec;
	}

	public getAccountSpec(): AccountSpec {
		return this.accountSpec;
	}

	public updateTrades($trades: DatabaseTrade<H>[]): void {
		this.useCaseUpdateTrades.updateTrades(
			$trades.map(
				trade => this.context.Data.DatabaseTrade.copy(trade),
			),
		);
	}

	public updateOrderbook($orderbook: DatabaseOrderbook<H>): void {
		this.useCaseUpdateOrderbook.updateOrderbook(
			this.context.Data.DatabaseOrderbook.copy($orderbook),
		);
	}

	public getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null {
		return this.useCaseGetProgress.getLatestDatabaseOrderbookId();
	}

	public getLatestDatabaseTradeId(): DatabaseTradeId | null {
		return this.useCaseGetProgress.getLatestDatabaseTradeId();
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.marketSpec.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.marketSpec.dollarVolume(price, quantity);
	}

	private async rawStart() {
		if (this.mtm)
			await this.mtm.start(this.stop);
	}

	private async rawStop() {
		if (this.mtm)
			await this.mtm.stop();
	}

	public capture(): Snapshot {
		return {
			marginAssets: this.marginAssets.capture(),
			makers: this.makers.capture(),
			book: this.book.capture(),
			pricing: this.pricing.capture(),
			progress: this.progress.capture(),
		}
	}

	public restore(snapshot: Snapshot): void {
		this.marginAssets.restore(snapshot.marginAssets);
		this.makers.restore(snapshot.makers);
		this.book.restore(snapshot.book);
		this.pricing.restore(snapshot.pricing);
		this.progress.restore(snapshot.progress);
	}
}

export interface Snapshot {
	marginAssets: any;
	makers: any;
	book: any;
	pricing: any;
	progress: any;
}