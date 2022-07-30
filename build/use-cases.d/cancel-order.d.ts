import { HLike, OpenOrder } from 'secretary-like';
import { Makers } from '../models.d/makers/makers';
import { ContextLike } from 'secretary-like';
export declare class UseCaseCancelOrder<H extends HLike<H>> {
    private vMCTX;
    private makers;
    constructor(vMCTX: ContextLike<H>, makers: Makers<H>);
    cancelOrder(order: OpenOrder<H>): OpenOrder<H>;
}
