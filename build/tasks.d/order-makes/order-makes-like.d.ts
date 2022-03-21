import { HLike, TexchangeOpenOrder } from 'interfaces';
export interface OrderMakesLike<H extends HLike<H>> {
    orderMakes(openOrder: TexchangeOpenOrder<H>): void;
}
