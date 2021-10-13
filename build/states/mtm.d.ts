import { Trade, Orderbook, StateLike, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Mutex } from 'coroutine-locks';
import { Core } from '../core';
export declare type Snapshot = Big;
export interface StateMtmLike<Snapshot> extends StateLike<Snapshot>, Startable {
    getSettlementPrice(): Big;
    updateTrades(trades: Trade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
}
export declare class StateMtm extends Startable implements StateMtmLike<Snapshot> {
    protected core: Core;
    protected markPrice?: Big;
    protected mutex: Mutex;
    constructor(core: Core, snapshot?: TypeRecur<Snapshot, Big, string>);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateTrades(trades: Trade[]): void;
    updateOrderbook(orderbook: Orderbook): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
}
