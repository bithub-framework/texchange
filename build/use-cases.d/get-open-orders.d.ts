import { HLike, OpenOrder } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
export declare class UseCaseGetOpenOrders<H extends HLike<H>> {
    private makers;
    constructor(makers: Makers<H>);
    getOpenOrders(): OpenOrder<H>[];
}
