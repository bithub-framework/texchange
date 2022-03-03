import { MakeOrder } from './use-cases.d/make-order';
import { CancelOrder } from './use-cases.d/cancel-order';
import { AmendOrder } from './use-cases.d/amend-order';
import { GetOpenOrders } from './use-cases.d/get-open-orders';
import { GetPositions } from './use-cases.d/get-positions';
import { GetBalances } from './use-cases.d/get-balances';
import { UpdateOrderbook } from './use-cases.d/update-orderbook';
import { UpdateTrades } from './use-cases.d/update-trades';
export interface UseCases {
    makeOrder: MakeOrder;
    cancelOrder: CancelOrder;
    amendOrder: AmendOrder;
    getOpenOrders: GetOpenOrders;
    getPositions: GetPositions;
    getBalances: GetBalances;
    updateOrderbook: UpdateOrderbook;
    updateTrades: UpdateTrades;
}
