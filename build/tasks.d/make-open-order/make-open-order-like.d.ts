import { HLike, OpenOrder } from 'secretary-like';
export interface MakeOpenOrderLike<H extends HLike<H>> {
    makeOpenOrder(order: OpenOrder<H>): OpenOrder<H>;
}
