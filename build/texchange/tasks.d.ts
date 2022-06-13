import { MakeOpenOrderLike } from '../tasks.d/make-open-order/make-open-order-like';
import { CancelOpenOrderLike } from '../tasks.d/cancel-open-order/cancel-open-order-like';
import { GetBalancesLike } from '../tasks.d/get-balances/get-balances-like';
import { GetClosableLike } from '../tasks.d/get-closable/get-closable-like';
import { GetPositionsLike } from '../tasks.d/get-positions/get-positions-like';
import { OrderMakesLike } from '../tasks.d/order-makes/order-makes-like';
import { OrderTakesLike } from '../tasks.d/order-takes/order-takes-like';
import { TradeTakesOpenMakersLike } from '../tasks.d/trade-takes-open-makers/trade-takes-open-makers-like';
import { ValidateOrderLike } from '../tasks.d/validate-order/validate-order-like';
import { OrderVolumesLike } from '../tasks.d/order-volumes/order-volumes-like';
import { GetAvailableLike } from '../tasks.d/get-available/get-available-like';
import { SettleLike } from '../tasks.d/settle/settle-like';
import { MarginAccumulationLike } from '../tasks.d/margin-accumulation/margin-accumulation-like';
import { HLike } from 'secretary-like';
export declare class Tasks<H extends HLike<H>> {
    getBalances: GetBalancesLike<H>;
    getPositions: GetPositionsLike<H>;
    getAvailable: GetAvailableLike<H>;
    getClosable: GetClosableLike<H>;
    settle: SettleLike;
    orderMakes: OrderMakesLike<H>;
    tradeTakesOpenMakers: TradeTakesOpenMakersLike<H>;
    orderTakes: OrderTakesLike<H>;
    validateOrder: ValidateOrderLike<H>;
    makeOpenOrder: MakeOpenOrderLike<H>;
    cancelOpenOrder: CancelOpenOrderLike<H>;
    marginAccumulation: MarginAccumulationLike<H>;
    orderVolumes: OrderVolumesLike<H>;
    constructor();
}