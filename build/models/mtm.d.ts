import { Trade, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { StatefulLike } from 'startable';
import { Mutex } from 'coroutine-locks';
import { type Hub } from '../hub';
export interface MtmLike<Snapshot> extends StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {
    getSettlementPrice(): Big;
    updateTrades(trades: Trade[]): void;
}
export declare namespace DefaultMtm {
    type Snapshot = Big;
    type Backup = TypeRecur<Snapshot, Big, string>;
}
export import Snapshot = DefaultMtm.Snapshot;
export import Backup = DefaultMtm.Backup;
export declare class DefaultMtm implements MtmLike<Snapshot> {
    protected hub: Hub;
    protected markPrice?: Big;
    protected mutex: Mutex;
    constructor(hub: Hub);
    protected _start(): Promise<void>;
    protected _stop(): Promise<void>;
    updateTrades(trades: Trade[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
