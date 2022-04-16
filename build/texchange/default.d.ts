import { TexchangeLike, Snapshot } from './texchange-like';
import { HLike } from 'interfaces';
import { Startable } from 'startable';
import { Config } from '../context.d/config';
import { HStatic, Timeline } from 'interfaces';
import { Assets } from '../models.d/assets';
import { Margins } from '../models.d/margins';
import { Makers } from '../models.d/makers/makers';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { Pricing } from '../models.d/pricing/pricing';
import { DefaultPricing } from '../models.d/pricing/default';
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
export declare class DefaultTexchange<H extends HLike<H>> implements TexchangeLike<H, DefaultPricing.Snapshot> {
    private context;
    private models;
    private broadcast;
    private tasks;
    private mtm;
    private useCases;
    private views;
    user: Latency<H>;
    admin: Joystick<H>;
    startable: Startable;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
    private start;
    private stop;
    private assembleContext;
    private assembleModels;
    private assembleTasks;
    private assembleUseCases;
    private assembleViews;
    capture(): Snapshot<DefaultPricing.Snapshot>;
    restore(snapshot: Snapshot<DefaultPricing.Snapshot>): void;
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
