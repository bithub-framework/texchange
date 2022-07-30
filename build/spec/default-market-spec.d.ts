import { HLike, MarketSpec } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
/**
 * 默认正向合约
 */
export declare class DefaultMarketSpec<H extends HLike<H>> implements MarketSpec<H> {
    PRICE_SCALE: number;
    QUANTITY_SCALE: number;
    CURRENCY_SCALE: number;
    MARKET_NAME: string;
    TICK_SIZE: H;
    constructor(context: VirtualMachineContextLike<H>);
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
