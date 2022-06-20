import { HLike, OpenOrder, MarketSpec, AccountSpec } from 'secretary-like';
import { Context } from '../context';
import { Makers } from '../models.d/makers/makers';
import { AvailableAssetsCalculator } from './available-assets-calculator/available-assets-calculator';
export declare class OrderValidator<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private makers;
    private calculator;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, makers: Makers<H>, calculator: AvailableAssetsCalculator<H>);
    validateOrder(order: OpenOrder<H>): void;
    private validateQuantity;
    private validateFormat;
}
