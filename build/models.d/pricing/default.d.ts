import { HLike, H, Trade } from 'secretary-like';
import { Pricing } from './pricing';
import { Context } from '../../context';
/**
 * 默认以最新价格作为结算价。
 */
export declare class DefaultPricing<H extends HLike<H>> extends Pricing<H, DefaultPricing.Snapshot> {
    protected context: Context<H>;
    private settlementPrice;
    constructor(context: Context<H>);
    updateTrades(trades: Trade<H>[]): void;
    getSettlementPrice(): H;
    capture(): DefaultPricing.Snapshot;
    restore(snapshot: DefaultPricing.Snapshot): void;
}
export declare namespace DefaultPricing {
    type Snapshot = H.Snapshot;
}
