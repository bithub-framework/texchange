import { HLike, TexchangeTrades } from 'interfaces';
import { StatefulLike } from 'startable';
import { Context } from '../../context/context';
export declare abstract class Pricing<H extends HLike<H>, Snapshot> implements StatefulLike<Snapshot> {
    protected context: Context<H>;
    constructor(context: Context<H>);
    abstract getSettlementPrice(): H;
    abstract updateTrades(trades: TexchangeTrades<H>): void;
    abstract capture(): Snapshot;
    abstract restore(snapshot: Snapshot): void;
}
