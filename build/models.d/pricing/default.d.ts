import { Trade, JsonCompatible, ReadonlyRecur } from 'interfaces';
import Big from 'big.js';
import { Pricing } from './pricing';
import { Context } from '../../context';
export declare class DefaultPricing extends Pricing<Snapshot> {
    protected readonly context: Context;
    private settlementPrice;
    constructor(context: Context);
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
}
declare type SnapshotStruct = Big;
export declare namespace DefaultPricing {
    type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = DefaultPricing.Snapshot;
export {};
