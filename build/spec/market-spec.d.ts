import { MarketSpecLike, HLike } from 'secretary-like';
import { Context } from '../context';
export declare abstract class MarketSpec<H extends HLike<H>> implements MarketSpecLike<H> {
    abstract PRICE_DP: number;
    abstract QUANTITY_DP: number;
    abstract CURRENCY_DP: number;
    TICK_SIZE: H;
    abstract MARKET_NAME: string;
    constructor(context: Context<H>);
    protected abstract unroundedQuantity(price: H, dollarVolume: H): H;
    quantity(price: H, dollarVolume: H): H;
    protected abstract unroundedDollarVolume(price: H, quantity: H): H;
    dollarVolume(price: H, quantity: H): H;
}
