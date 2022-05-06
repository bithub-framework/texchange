import { HLike, MarketCalc } from 'secretary-like';
/**
 * 默认正向合约
 */
export declare class DefaultMarketCalc<H extends HLike<H>> implements MarketCalc<H> {
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
