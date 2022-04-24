import { HLike } from 'interfaces';
import { OpenOrder } from '../../interfaces';
export interface ValidateOrderLike<H extends HLike<H>> {
    validateOrder(order: OpenOrder<H>): void;
}
