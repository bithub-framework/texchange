import { OrderTakes } from './controllers.d/order-takes';
import { OrderMakes } from './controllers.d/order-makes';
import { TradeTakesOpenMakers } from './controllers.d/trade-takes-open-makers';
import { ValidateOrder } from './controllers.d/validate-order';
import { Settle } from './controllers.d/settle';
import { GetAvailable } from './controllers.d/get-available';
import { GetClosable } from './controllers.d/get-closable';
import { MakeOpenOrder } from './controllers.d/make-open-order';
import { CancelOpenOrder } from './controllers.d/cancel-open-order';
import { GetBalances } from './controllers.d/get-balances';
import { GetPositions } from './controllers.d/get-positions';
export interface Controllers {
    getBalances: GetBalances;
    getPositions: GetPositions;
    getAvailable: GetAvailable;
    getClosable: GetClosable;
    settle: Settle;
    orderMakes: OrderMakes;
    tradeTakesOpenMakers: TradeTakesOpenMakers;
    orderTakes: OrderTakes;
    validateOrder: ValidateOrder;
    makeOpenOrder: MakeOpenOrder;
    cancelOpenOrder: CancelOpenOrder;
}
