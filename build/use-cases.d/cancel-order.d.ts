import { HLike, OpenOrder } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
import { ContextLike } from 'secretary-like';
export declare class UseCaseCancelOrder<H extends HLike<H>> {
    private vmctx;
    private makers;
    constructor(vmctx: ContextLike<H>, makers: Makers<H>);
    cancelOrder(order: OpenOrder<H>): OpenOrder<H>;
}
