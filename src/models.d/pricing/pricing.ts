import {
	HLike,
	TexchangeTrade,
} from 'interfaces';
import { StatefulLike } from 'startable';


export abstract class Pricing<H extends HLike<H>, Snapshot>
	implements StatefulLike<Snapshot> {

	public abstract getSettlementPrice(): H;
	public abstract updateTrades(
		trades: readonly TexchangeTrade<H>[],
	): void;

	public abstract capture(): Snapshot;

	public abstract restore(snapshot: Snapshot): void;
}
