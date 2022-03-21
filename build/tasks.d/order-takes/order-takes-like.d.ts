import { HLike, TexchangeOpenOrder, TexchangeTrade } from 'interfaces';
export interface OrderTakesLike<H extends HLike<H>> {
    orderTakes(taker: TexchangeOpenOrder<H>): TexchangeTrade<H>[];
}
