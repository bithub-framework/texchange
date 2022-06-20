import {
	HLike,
	Trade,
} from 'secretary-like';
import { StatefulLike } from '../../stateful-like';


export abstract class Pricing<H extends HLike<H>, Snapshot>
	implements StatefulLike<Snapshot> {

	public abstract getSettlementPrice(): H;
	public abstract updateTrades(trades: Trade<H>[]): void;

	public abstract capture(): Snapshot;
	public abstract restore(snapshot: Snapshot): void;
}
