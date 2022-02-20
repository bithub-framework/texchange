import { OrderTakes } from './controllers.d/order-takes';
import { OrderMakes } from './controllers.d/order-makes';
import { TradeTakesOpenMakers } from './controllers.d/trade-takes-open-makers';
import { Mtm } from './controllers.d/mtm';
import { ValidateOrder } from './controllers.d/validate-order';
import { Settle } from './controllers.d/settle';
import { GetAvailable } from './controllers.d/get-available';
import { GetClosable } from './controllers.d/get-closable';
import { MakeOpenOrder } from './controllers.d/make-open-order';
import { CancelOpenOrder } from './controllers.d/cancel-open-order';
export interface Controllers {
    getAvailable: GetAvailable;
    getClosable: GetClosable;
    clearing: Settle;
    making: OrderMakes;
    mtm: Mtm;
    taken: TradeTakesOpenMakers;
    orderTakes: OrderTakes;
    validation: ValidateOrder;
    makeOpenOrder: MakeOpenOrder;
    cancelOpenOrder: CancelOpenOrder;
}
