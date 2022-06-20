import { HLike, OpenOrder } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
export declare class UseCaseCancelOrder<H extends HLike<H>> {
    private makers;
    constructor(makers: Makers<H>);
    cancelOrder(order: OpenOrder<H>): OpenOrder<H>;
}
