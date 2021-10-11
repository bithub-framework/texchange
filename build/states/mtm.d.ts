import { Trade, StateLike } from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
export declare type Snapshot = Big;
export interface StateMtmLike<Snapshot> extends StateLike<Snapshot>, Startable {
    getMarkPrice(): Big;
    updateTrade(trade: Trade): void;
}
export declare class StateMtm extends Startable implements StateMtmLike<Snapshot> {
    private latestPrice?;
    private mutex;
    constructor(snapshot?: Snapshot);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateTrade(trade: Trade): void;
    getMarkPrice(): Big;
    capture(): Snapshot;
}
