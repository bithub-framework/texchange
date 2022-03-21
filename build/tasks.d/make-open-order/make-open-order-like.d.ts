import { HLike, TexchangeOpenOrder } from 'interfaces';
export interface MakeOpenOrderLike<H extends HLike<H>> {
    makeOpenOrder(order: TexchangeOpenOrder<H>): TexchangeOpenOrder<H>;
}
