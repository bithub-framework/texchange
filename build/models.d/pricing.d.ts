import { Trade } from 'interfaces';
import Big from 'big.js';
import { Model, Stringified } from './model';
import { Context } from '../context';
export declare abstract class Pricing<Snapshot> extends Model<Snapshot> {
    protected context: Context;
    protected settlementPrice: Big;
    constructor(context: Context, settlementPrice: Big);
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
    abstract capture(): Snapshot;
    abstract restore(backup: Stringified<Snapshot>): void;
}
export declare class DefaultPricing extends Pricing<Snapshot> {
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
export declare type Snapshot = Big;
export declare type Backup = Stringified<Snapshot>;
