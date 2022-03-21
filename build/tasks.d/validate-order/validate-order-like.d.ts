import { HLike, TexchangeOpenOrder } from 'interfaces';
export interface ValidateOrderLike<H extends HLike<H>> {
    validateOrder(order: TexchangeOpenOrder<H>): void;
}
