import { HLike, H, Trade } from 'secretary-like';
import { Pricing } from './pricing';
import { Context } from '../../context';
export declare class DefaultPricing<H extends HLike<H>> extends Pricing<H, DefaultPricing.Snapshot> {
    private context;
    private settlementPrice;
    constructor(context: Context<H>, settlementPrice: H);
    updateTrades(trades: Trade<H>[]): void;
    getSettlementPrice(): H;
    capture(): DefaultPricing.Snapshot;
    restore(snapshot: DefaultPricing.Snapshot): void;
}
export declare namespace DefaultPricing {
    type Snapshot = H.Snapshot;
}
