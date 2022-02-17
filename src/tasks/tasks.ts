import { MakeOrder } from './maker-order';
import { CancelOrder } from './cancel-order';
import { AmendOrder } from './amend-order';
import { GetOpenOrders } from './get-open-orders';
import { GetPositions } from './get-positions';
import { GetBalances } from './get-balances';
import { UpdateOrderbook } from './update-orderbook';
import { UpdateTrades } from './update-trades';

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
