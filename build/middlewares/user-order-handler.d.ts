import { HLike, OpenOrder } from 'secretary-like';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { MarketSpec } from 'secretary-like';
import { AccountSpec } from 'secretary-like';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets';
import { Makers } from '../models.d/makers/makers';
import { AvailableAssetsCalculator } from './available-assets-calculator/available-assets-calculator';
import { OrderValidator } from './order-validator';
export declare class UserOrderHandler<H extends HLike<H>> {
    private context;
    private marketSpec;
    private accountSpec;
    private book;
    private marginAssets;
    private progress;
    private makers;
    private broadcast;
    private calculator;
    private validator;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, accountSpec: AccountSpec, book: Book<H>, marginAssets: MarginAssets<H>, progress: Progress<H>, makers: Makers<H>, broadcast: Broadcast<H>, calculator: AvailableAssetsCalculator<H>, validator: OrderValidator<H>);
    makeOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
    private $orderTakes;
    private orderMakes;
    cancelOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
