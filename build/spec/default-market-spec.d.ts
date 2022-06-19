import { MarketSpec, HLike } from 'secretary-like';
import { Context } from '../context';
/**
 * 默认正向合约
 */
export declare class DefaultMarketSpec<H extends HLike<H>> implements MarketSpec<H> {
    PRICE_DP: number;
    QUANTITY_DP: number;
    CURRENCY_DP: number;
    TICK_SIZE: H;
    MARKET_NAME: string;
    constructor(context: Context<H>);
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
