import { HLike } from 'secretary-like';
import { MarketSpec } from './market-spec';
/**
 * 默认正向合约
 */
export declare class DefaultMarketSpec<H extends HLike<H>> extends MarketSpec<H> {
    PRICE_DP: number;
    QUANTITY_DP: number;
    CURRENCY_DP: number;
    MARKET_NAME: string;
    protected unroundedQuantity(price: H, dollarVolume: H): H;
    protected unroundedDollarVolume(price: H, quantity: H): H;
}
