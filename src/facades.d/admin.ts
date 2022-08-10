import { VirtualMachineContextLike } from '../vmctx';
import {
	HLike,
	MarketSpec,
	AccountSpec,
	ConnectionClosed,
} from 'secretary-like';
import { createStartable } from 'startable';
import { StatefulLike } from '../stateful-like';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Pricing } from '../models.d/pricing/pricing';
import { Progress } from '../models.d/progress';
import { Broadcast } from '../middlewares/broadcast';
import { Mtm } from '../mark-to-market/mtm';
import { DatabaseOrderbook, DatabaseOrderbookId } from '../data-types/database-orderbook';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../data-types/database-trade';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class AdminFacade<H extends HLike<H>> implements StatefulLike<Snapshot> {
	public $s = createStartable(
		() => this.rawStart(),
		() => this.rawStop(),
	);

	public constructor(
		@inject(TYPES.vmctx)
		private vmctx: VirtualMachineContextLike<H>,
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
		@inject(TYPES.MIDDLEWARES.broadcast)
		private broadcast: Broadcast<H>,
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
				trade => this.vmctx.DataTypes.databaseTradeFactory.create(trade),
			),
		);
	}

	public updateOrderbook($orderbook: DatabaseOrderbook<H>): void {
		this.useCaseUpdateOrderbook.updateOrderbook(
			this.vmctx.DataTypes.databaseOrderbookFactory.create($orderbook),
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
			await this.mtm.$s.start(this.$s.stop);
	}

	private async rawStop() {
		this.broadcast.emit('error', new ConnectionClosed('Texchange closed.'));
		if (this.mtm)
			await this.mtm.$s.stop();
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
