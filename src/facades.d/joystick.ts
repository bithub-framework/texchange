import { Context } from '../context';
import { Config } from '../context.d/config';
import { HLike } from 'secretary-like';
import { Startable } from 'startable';
import { StatefulLike } from '../stateful-like';

import { Models, Snapshot } from '../models';

import { Mtm } from '../mark-to-market/mtm';

import { DatabaseOrderbook, DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../interfaces/database-trade';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { GetProgress } from '../use-cases.d/get-progress';


export class Joystick<H extends HLike<H>, PricingSnapshot>
	implements StatefulLike<Snapshot<PricingSnapshot>>{
	private startable: Startable;
	public config: Config<H>;

	public constructor(
		private context: Context<H>,
		private models: Models<H, PricingSnapshot>,
		private mtm: Mtm<H> | null,
		private useCases: Joystick.UseCaseDeps<H>,
	) {
		this.startable = new Startable(
			() => this.start(),
			() => this.stop(),
		);

		this.config = this.context.config;
	}

	public Data = this.context.Data;

	public updateTrades($trades: DatabaseTrade<H>[]): void {
		this.useCases.updateTrades.updateTrades(
			$trades.map(
				trade => this.context.Data.DatabaseTrade.copy(trade),
			),
		);
	}

	public updateOrderbook($orderbook: DatabaseOrderbook<H>): void {
		this.useCases.updateOrderbook.updateOrderbook(
			this.context.Data.DatabaseOrderbook.copy($orderbook),
		);
	}

	public getLatestDatabaseOrderbookId(): DatabaseOrderbookId | null {
		return this.useCases.getProgress.getLatestDatabaseOrderbookId();
	}

	public getLatestDatabaseTradeId(): DatabaseTradeId | null {
		return this.useCases.getProgress.getLatestDatabaseTradeId();
	}

	public quantity(price: H, dollarVolume: H): H {
		return this.context.calc.quantity(price, dollarVolume);
	};

	public dollarVolume(price: H, quantity: H): H {
		return this.context.calc.dollarVolume(price, quantity);
	}

	private async start() {
		if (this.mtm)
			await this.mtm.startable.start(this.startable.stop);
	}

	private async stop() {
		if (this.mtm)
			await this.mtm.startable.stop();
	}

	public capture(): Snapshot<PricingSnapshot> {
		return {
			assets: this.models.assets.capture(),
			margins: this.models.margins.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	public restore(snapshot: Snapshot<PricingSnapshot>): void {
		this.models.assets.restore(snapshot.assets);
		this.models.margins.restore(snapshot.margins);
		this.models.makers.restore(snapshot.makers);
		this.models.book.restore(snapshot.book);
		this.models.pricing.restore(snapshot.pricing);
		this.models.progress.restore(snapshot.progress);
	}
}

export namespace Joystick {
	export interface UseCaseDeps<H extends HLike<H>> {
		updateTrades: UpdateTrades<H>;
		updateOrderbook: UpdateOrderbook<H>;
		getProgress: GetProgress<H>;
	}
}
