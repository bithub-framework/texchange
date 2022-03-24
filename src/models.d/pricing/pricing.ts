import {
	HLike,
	TexchangeTrade,
} from 'interfaces';
import { StatefulLike } from 'startable';
import { Context } from '../../context/context';


export abstract class Pricing<H extends HLike<H>, Snapshot>
	implements StatefulLike<Snapshot> {

	public constructor(
		protected readonly context: Context<H>,
	) { }

	public abstract getSettlementPrice(): H;
	public abstract updateTrades(
		trades: readonly TexchangeTrade<H>[],
	): void;

	public abstract capture(): Snapshot;

	public abstract restore(snapshot: Snapshot): void;
}
