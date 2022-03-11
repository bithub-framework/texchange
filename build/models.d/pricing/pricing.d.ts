import { Trade } from 'interfaces';
import Big from 'big.js';
import { Model } from '../../model';
export declare abstract class Pricing<Snapshot> extends Model<Snapshot> {
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
}
