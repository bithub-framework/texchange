import { Trade } from 'interfaces';
import Big from 'big.js';
import { Model } from './model';
import { Context } from '../context';
export declare abstract class Pricing<Snapshot> extends Model<Snapshot> {
    protected abstract readonly context: Context;
    protected abstract settlementPrice: Big;
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
    abstract capture(): Snapshot;
    abstract restore(snapshot: Snapshot): void;
}
