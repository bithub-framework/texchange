import { Trade, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { StatefulLike } from 'startable';
import { type Hub } from '../hub';
export declare abstract class Mtm<Snapshot> implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {
    protected hub: Hub;
    protected markPrice: Big;
    constructor(hub: Hub, markPrice: Big);
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: Trade[]): void;
    abstract capture(): Snapshot;
    abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
}
export declare class DefaultMtm extends Mtm<Snapshot> {
    updateTrades(trades: Trade[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
declare type Snapshot = Big;
declare type Backup = TypeRecur<Snapshot, Big, string>;
export {};
