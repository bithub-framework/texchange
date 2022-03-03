import { Trade, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { Model } from './model';
import { Context } from '../context';
export declare abstract class Pricing<Snapshot, Backup> extends Model<Snapshot, Backup> {
    protected context: Context;
    protected settlementPrice: Big;
    constructor(context: Context, settlementPrice: Big);
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
    abstract capture(): Snapshot;
    abstract restore(backup: Backup): void;
}
export declare class DefaultPricing extends Pricing<Snapshot, Backup> {
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
declare type Snapshot = Big;
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export {};
