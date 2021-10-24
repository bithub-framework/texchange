import { Trade, StateLike, Parsed } from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Mutex } from 'coroutine-locks';
import { Core } from '../core';
export declare type Snapshot = Big;
export interface StateMtmLike<Snapshot> extends StateLike<Snapshot> {
    getSettlementPrice(): Big;
    updateTrades(trades: Trade[]): void;
}
export declare class StateMtm extends Startable implements StateMtmLike<Snapshot> {
    protected core: Core;
    protected markPrice?: Big;
    protected mutex: Mutex;
    constructor(core: Core);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateTrades(trades: Trade[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Parsed<Snapshot>): void;
}
