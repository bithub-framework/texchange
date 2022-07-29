import { MarketSpecLike, HLike } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
export declare abstract class MarketSpec<H extends HLike<H>> implements MarketSpecLike<H> {
    abstract PRICE_SCALE: number;
    abstract QUANTITY_SCALE: number;
    abstract CURRENCY_SCALE: number;
    TICK_SIZE: H;
    abstract MARKET_NAME: string;
    constructor(context: VirtualMachineContextLike<H>);
    protected abstract unroundedQuantity(price: H, dollarVolume: H): H;
    quantity(price: H, dollarVolume: H): H;
    protected abstract unroundedDollarVolume(price: H, quantity: H): H;
    dollarVolume(price: H, quantity: H): H;
}
