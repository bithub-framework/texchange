import { MakeOrder } from './tasks.d/make-order';
import { CancelOrder } from './tasks.d/cancel-order';
import { AmendOrder } from './tasks.d/amend-order';
import { GetOpenOrders } from './tasks.d/get-open-orders';
import { GetPositions } from './tasks.d/get-positions';
import { GetBalances } from './tasks.d/get-balances';
import { UpdateOrderbook } from './tasks.d/update-orderbook';
import { UpdateTrades } from './tasks.d/update-trades';

export interface Tasks {
	makeOrder: MakeOrder;
	cancelOrder: CancelOrder;
	amendOrder: AmendOrder;
	getOpenOrders: GetOpenOrders;
	getPositions: GetPositions;
	getBalances: GetBalances;
	updateOrderbook: UpdateOrderbook;
	updateTrades: UpdateTrades;
}
