import { Context } from '../context';
import { Spec } from '../context.d/spec';
import { HLike } from 'secretary-like';
import { Startable, StartableLike } from 'startable';
import { StatefulLike } from '../stateful-like';

import { Models } from '../texchange/models';

import { Mtm } from '../mark-to-market/mtm';

import { DatabaseOrderbook, DatabaseOrderbookId } from '../interfaces/database-orderbook';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { DatabaseTrade, DatabaseTradeId } from '../interfaces/database-trade';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../injection/types';


export class AdminFacade<H extends HLike<H>>
	implements StatefulLike<Models.Snapshot>, StartableLike {

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

	private spec: Spec<H>;

	public constructor(
		@inject(TYPES.context)
		private context: Context<H>,
		@inject(TYPES.models)
		private models: Models<H>,
		@inject(TYPES.mtm)
		private mtm: Mtm<H> | null,
		@inject(TYPES.useCases)
		private useCases: Joystick.UseCaseDeps<H>,
	) {
		this.spec = this.context.spec;
	}

	public getSpec(): Spec<H> {
		return this.spec;
	}

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

	private async rawStart() {
		if (this.mtm)
			await this.mtm.start(this.stop);
	}

	private async rawStop() {
		if (this.mtm)
			await this.mtm.stop();
	}

	public capture(): Models.Snapshot {
		return {
			assets: this.models.assets.capture(),
			margins: this.models.margins.capture(),
			makers: this.models.makers.capture(),
			book: this.models.book.capture(),
			pricing: this.models.pricing.capture(),
			progress: this.models.progress.capture(),
		}
	}

	public restore(snapshot: Models.Snapshot): void {
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
		updateTrades: UseCaseUpdateTrades<H>;
		updateOrderbook: UseCaseUpdateOrderbook<H>;
		getProgress: UseCaseGetProgress<H>;
	}
}
