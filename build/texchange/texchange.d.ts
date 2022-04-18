import { HLike } from 'interfaces';
import { StartableLike } from 'startable';
import { StatefulLike } from '../stateful-like';
import { Context } from '../context';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { Broadcast } from '../broadcast';
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
import { Mtm } from '../mark-to-market/mtm';
import { MakeOrder } from '../use-cases.d/make-order';
import { CancelOrder } from '../use-cases.d/cancel-order';
import { AmendOrder } from '../use-cases.d/amend-order';
import { GetOpenOrders } from '../use-cases.d/get-open-orders';
import { GetPositions as GetPositionsUseCase } from '../use-cases.d/get-positions';
import { GetBalances as GetBalancesUseCase } from '../use-cases.d/get-balances';
import { UpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { Subscription } from '../use-cases.d/subscription';
import { Instant } from '../views.d/instant';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';
export declare abstract class Texchange<H extends HLike<H>, PricingSnapshot> implements StatefulLike<Snapshot<PricingSnapshot>> {
    protected abstract context: Context<H>;
    protected abstract models: Models<H, PricingSnapshot>;
    protected abstract broadcast: Broadcast<H>;
    protected abstract tasks: Tasks<H>;
    protected abstract mtm: Mtm<H> | null;
    protected abstract useCases: UseCases<H>;
    protected abstract views: Views<H>;
    abstract user: Latency<H>;
    abstract admin: Joystick<H>;
    startable: StartableLike;
    constructor();
    private start;
    private stop;
    capture(): Snapshot<PricingSnapshot>;
    restore(snapshot: Snapshot<PricingSnapshot>): void;
}
export interface Models<H extends HLike<H>, PricingSnapshot> {
    assets: Assets<H>;
    margins: Margins<H>;
    makers: Makers<H>;
    book: Book<H>;
    progress: Progress<H>;
    pricing: Pricing<H, PricingSnapshot>;
}
export interface Tasks<H extends HLike<H>> {
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
}
export interface UseCases<H extends HLike<H>> {
    makeOrder: MakeOrder<H>;
    cancelOrder: CancelOrder<H>;
    amendOrder: AmendOrder<H>;
    getOpenOrders: GetOpenOrders<H>;
    getPositions: GetPositionsUseCase<H>;
    getBalances: GetBalancesUseCase<H>;
    updateOrderbook: UpdateOrderbook<H>;
    updateTrades: UpdateTrades<H>;
    subscription: Subscription<H>;
}
export interface Views<H extends HLike<H>> {
    instant: Instant<H>;
    latency: Latency<H>;
    joystick: Joystick<H>;
}
export interface Snapshot<PricingSnapshot> {
    readonly assets: Assets.Snapshot;
    readonly margins: Margins.Snapshot;
    readonly makers: Makers.Snapshot;
    readonly book: Book.Snapshot;
    readonly pricing: PricingSnapshot;
    readonly progress: Progress.Snapshot;
}
