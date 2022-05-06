import { HLike, OpenOrder } from 'secretary-like';
export interface OrderMakesLike<H extends HLike<H>> {
    orderMakes(order: OpenOrder<H>): void;
}
