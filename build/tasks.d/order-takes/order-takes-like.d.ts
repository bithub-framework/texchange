import { HLike, TexchangeOpenOrder, TexchangeTrades } from 'interfaces';
export interface OrderTakesLike<H extends HLike<H>> {
    orderTakes(taker: TexchangeOpenOrder<H>): {
        trades: TexchangeTrades<H>;
        maker: TexchangeOpenOrder<H>;
    };
}
