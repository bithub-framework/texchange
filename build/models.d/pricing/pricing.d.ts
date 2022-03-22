import { HLike, TexchangeTrade } from 'interfaces';
import { StatefulLike } from 'startable';
export declare abstract class Pricing<H extends HLike<H>, Snapshot> implements StatefulLike<Snapshot> {
    abstract getSettlementPrice(): H;
    abstract updateTrades(trades: readonly TexchangeTrade<H>[]): void;
    abstract capture(): Snapshot;
    abstract restore(snapshot: Snapshot): void;
}
