import { MakeOrder } from './use-cases/make-order';
import { CancelOrder } from './use-cases/cancel-order';
import { AmendOrder } from './use-cases/amend-order';
import { GetOpenOrders } from './use-cases/get-open-orders';
import { GetPositions } from './use-cases/get-positions';
import { GetBalances } from './use-cases/get-balances';
import { UpdateOrderbook } from './use-cases/update-orderbook';
import { UpdateTrades } from './use-cases/update-trades';
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
