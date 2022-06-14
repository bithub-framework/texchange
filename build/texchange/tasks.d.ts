import { TaskMakeOpenOrder } from '../tasks.d/make-open-order';
import { TaskCancelOpenOrder } from '../tasks.d/cancel-open-order';
import { TaskGetBalances } from '../tasks.d/get-balances';
import { TaskGetClosable } from '../tasks.d/get-closable';
import { TaskGetPositions } from '../tasks.d/get-positions';
import { TaskOrderMakes } from '../tasks.d/order-makes';
import { TaskOrderTakes } from '../tasks.d/order-takes';
import { TaskTradeTakesOpenMakers } from '../tasks.d/trade-takes-open-makers';
import { TaskValidateOrder } from '../tasks.d/validate-order';
import { TaskOrderVolumes } from '../tasks.d/order-volumes';
import { TaskGetAvailable } from '../tasks.d/get-available/get-available';
import { TaskSettle } from '../tasks.d/settle/settle';
import { TaskMarginAccumulation } from '../tasks.d/margin-accumulation/margin-accumulation';
import { HLike } from 'secretary-like';
export declare class Tasks<H extends HLike<H>> {
    getBalances: TaskGetBalances<H>;
    getPositions: TaskGetPositions<H>;
    getAvailable: TaskGetAvailable<H>;
    getClosable: TaskGetClosable<H>;
    settle: TaskSettle<H>;
    orderMakes: TaskOrderMakes<H>;
    tradeTakesOpenMakers: TaskTradeTakesOpenMakers<H>;
    orderTakes: TaskOrderTakes<H>;
    validateOrder: TaskValidateOrder<H>;
    makeOpenOrder: TaskMakeOpenOrder<H>;
    cancelOpenOrder: TaskCancelOpenOrder<H>;
    marginAccumulation: TaskMarginAccumulation<H>;
    orderVolumes: TaskOrderVolumes<H>;
    constructor(getBalances: TaskGetBalances<H>, getPositions: TaskGetPositions<H>, getAvailable: TaskGetAvailable<H>, getClosable: TaskGetClosable<H>, settle: TaskSettle<H>, orderMakes: TaskOrderMakes<H>, tradeTakesOpenMakers: TaskTradeTakesOpenMakers<H>, orderTakes: TaskOrderTakes<H>, validateOrder: TaskValidateOrder<H>, makeOpenOrder: TaskMakeOpenOrder<H>, cancelOpenOrder: TaskCancelOpenOrder<H>, marginAccumulation: TaskMarginAccumulation<H>, orderVolumes: TaskOrderVolumes<H>);
}
