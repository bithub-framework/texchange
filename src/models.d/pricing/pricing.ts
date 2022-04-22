import {
	HLike,
	TexchangeTrades,
} from 'interfaces';
import { StatefulLike } from '../../stateful-like';
import { Context } from '../../context';


export abstract class Pricing<H extends HLike<H>, Snapshot>
	implements StatefulLike<Snapshot> {
	protected abstract context: Context<H>;

	public abstract getSettlementPrice(): H;
	public abstract updateTrades(trades: TexchangeTrades<H>): void;

	public abstract capture(): Snapshot;
	public abstract restore(snapshot: Snapshot): void;
}
