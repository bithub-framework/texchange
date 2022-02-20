import { Trade, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { ModelLike } from './model';
import { Context } from '../context';
export declare abstract class Pricing<Snapshot, Stage> implements ModelLike<Snapshot, TypeRecur<Snapshot, Big, string>, Stage> {
    protected context: Context;
    protected settlementPrice: Big;
    abstract stage?: Stage;
    constructor(context: Context, settlementPrice: Big);
    abstract initializeStage(): void;
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
    abstract capture(): Snapshot;
    abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
}
export declare class DefaultPricing extends Pricing<Snapshot, boolean> {
    stage?: boolean;
    initializeStage(): void;
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
declare type Snapshot = Big;
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export {};
