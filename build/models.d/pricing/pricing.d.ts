import { HLike, Trade } from 'secretary-like';
import { StatefulLike } from '../../stateful-like';
export declare abstract class Pricing<H extends HLike<H>, Snapshot> implements StatefulLike<Snapshot> {
    abstract getSettlementPrice(): H;
    abstract updateTrades(trades: Trade<H>[]): void;
    abstract capture(): Snapshot;
    abstract restore(snapshot: Snapshot): void;
}
