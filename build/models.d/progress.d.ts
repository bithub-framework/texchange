import { Context } from '../context/context';
import { Trade, HLike, TexchangeTradeId } from 'interfaces';
import { StatefulLike } from 'startable';
export declare class Progress<H extends HLike<H>> implements StatefulLike<Progress.Snapshot> {
    private readonly context;
    userTradeCount: number;
    userOrderCount: number;
    constructor(context: Context<H>);
    updateDatabaseTrades(trades: readonly DatabaseTrade<H>[]): void;
    capture(): Progress.Snapshot;
    restore(snapshot: Progress.Snapshot): void;
}
export interface DatabaseTrade<H extends HLike<H>> extends Trade<H, TexchangeTradeId> {
    readonly id: string;
}
export declare namespace Progress {
    interface Snapshot {
        readonly userTradeCount: number;
        readonly userOrderCount: number;
    }
}
