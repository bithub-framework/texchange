import { HLike, Trade } from 'secretary-like';
import { StatefulLike } from '../../stateful-like';
import { Context } from '../../context';
export declare abstract class Pricing<H extends HLike<H>, Snapshot> implements StatefulLike<Snapshot> {
    protected abstract context: Context<H>;
    abstract getSettlementPrice(): H;
    abstract updateTrades(trades: Trade<H>[]): void;
    abstract capture(): Snapshot;
    abstract restore(snapshot: Snapshot): void;
}
