import { HLike, OpenOrderLike } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
import { ContextLike } from 'secretary-like';
export declare class UseCaseCancelOrder<H extends HLike<H>> {
    private context;
    private makers;
    constructor(context: ContextLike<H>, makers: Makers<H>);
    cancelOrder(order: OpenOrderLike<H>): OpenOrderLike<H>;
}
