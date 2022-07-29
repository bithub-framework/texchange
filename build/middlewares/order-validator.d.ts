import { HLike, OpenOrder, MarketSpecLike, AccountSpecLike } from 'secretary-like';
import { VirtualMachineContextLike } from '../vmctx';
import { Makers } from '../models.d/makers/makers';
import { AvailableAssetsCalculator } from './available-assets-calculator/available-assets-calculator';
export declare class OrderValidator<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private makers;
    private calculator;
    constructor(context: VirtualMachineContextLike<H>, marketSpec: MarketSpecLike<H>, accountSpec: AccountSpecLike, makers: Makers<H>, calculator: AvailableAssetsCalculator<H>);
    validateOrder(order: OpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}
