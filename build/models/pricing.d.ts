import { Trade, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { StatefulLike } from 'startable';
import { Context } from '../context/context';
export declare abstract class Pricing<Snapshot> implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {
    protected context: Context;
    protected settlementPrice: Big;
    constructor(context: Context, settlementPrice: Big);
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
    abstract capture(): Snapshot;
    abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
}
export declare class DefaultPricing extends Pricing<Snapshot> {
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
declare type Snapshot = Big;
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export {};
