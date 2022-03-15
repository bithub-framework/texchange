import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions } from '../use-cases.d/get-positions';
import { GetBalances } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { HLike } from 'interfaces';
export interface UseCasesLike<H extends HLike<H>> {
    readonly makeOrder: MakeOrder<H>;
    readonly cancelOrder: CancelOrder<H>;
    readonly amendOrder: AmendOrder<H>;
    readonly getOpenOrders: GetOpenOrders<H>;
    readonly getPositions: GetPositions<H>;
    readonly getBalances: GetBalances<H>;
    readonly updateOrderbook: UpdateOrderbook<H>;
    readonly updateTrades: UpdateTrades<H>;
}
