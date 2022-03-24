import { TexchangeTrade, HLike, H } from 'interfaces';
import { Pricing } from './pricing';
import { Context } from '../../context/context';
/**
 * 默认以最新价格作为结算价。
 */
export declare class DefaultPricing<H extends HLike<H>> extends Pricing<H, DefaultPricing.Snapshot> {
    private settlementPrice;
    constructor(context: Context<H>);
    updateTrades(trades: readonly TexchangeTrade<H>[]): void;
    getSettlementPrice(): H;
    capture(): DefaultPricing.Snapshot;
    restore(snapshot: DefaultPricing.Snapshot): void;
}
export declare namespace DefaultPricing {
    type Snapshot = H.Snapshot;
}
