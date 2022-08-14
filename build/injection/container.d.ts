import { HLike, MarketSpec, AccountSpec } from 'secretary-like';
import { BaseContainer } from '@zimtsui/injektor';
import { TYPES } from './types';
import { VirtualMachineContextLike } from '../vmctx';
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { CreditAssets } from '../models.d/margin-assets/credit-assets/credit-assets';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets/margin-assets';
import { Broadcast } from '../middlewares/broadcast';
import { Mtm } from '../mark-to-market/mtm';
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { DatabaseTradeHandler } from '../middlewares/database-trade-handler';
import { Matcher } from '../middlewares/matcher';
import { OrderValidator } from '../middlewares/order-validator';
import { UseCaseMakeOrder } from '../use-cases.d/make-order';
import { UseCaseCancelOrder } from '../use-cases.d/cancel-order';
import { UseCaseAmendOrder } from '../use-cases.d/amend-order';
import { UseCaseGetOpenOrders } from '../use-cases.d/get-open-orders';
import { UseCaseGetPositions } from '../use-cases.d/get-positions';
import { UseCaseGetBalances } from '../use-cases.d/get-balances';
import { UseCaseUpdateOrderbook } from '../use-cases.d/update-orderbook';
import { UseCaseUpdateTrades } from '../use-cases.d/update-trades';
import { UseCaseSubscription } from '../use-cases.d/subscription';
import { UseCaseGetProgress } from '../use-cases.d/get-progress';
import { LatencyConfig } from '../facades.d/latency-config';
import { Instant } from '../facades.d/user-account/instant';
import { AdminFacade } from '../facades.d/admin';
import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';
import { Texchange } from '../texchange';
export declare abstract class Container<H extends HLike<H>> extends BaseContainer {
    abstract [TYPES.marketSpec]: () => MarketSpec<H>;
    abstract [TYPES.accountSpec]: () => AccountSpec;
    [TYPES.vmctx]: () => VirtualMachineContextLike<H>;
    abstract [TYPES.MODELS.initialBalance]: () => H;
    abstract [TYPES.MODELS.makers]: () => Makers<H>;
    abstract [TYPES.MODELS.pricing]: () => Pricing<H, any>;
    [TYPES.MODELS.creditAssets]: () => CreditAssets<H>;
    abstract [TYPES.MODELS.marginAssets]: () => MarginAssets<H>;
    [TYPES.MODELS.book]: () => Book<H>;
    [TYPES.MODELS.progress]: () => Progress<H>;
    abstract [TYPES.MIDDLEWARES.availableAssetsCalculator]: () => AvailableAssetsCalculator<H>;
    [TYPES.MIDDLEWARES.databaseTradeHandler]: () => DatabaseTradeHandler<H>;
    [TYPES.MIDDLEWARES.matcher]: () => Matcher<H>;
    [TYPES.MIDDLEWARES.orderValidator]: () => OrderValidator<H>;
    [TYPES.MIDDLEWARES.broadcast]: () => Broadcast<H>;
    abstract [TYPES.mtm]: () => Mtm<H> | null;
    [TYPES.USE_CASES.makeOrder]: () => UseCaseMakeOrder<H>;
    [TYPES.USE_CASES.cancelOrder]: () => UseCaseCancelOrder<H>;
    [TYPES.USE_CASES.amendOrder]: () => UseCaseAmendOrder<H>;
    [TYPES.USE_CASES.getOpenOrders]: () => UseCaseGetOpenOrders<H>;
    [TYPES.USE_CASES.getPositions]: () => UseCaseGetPositions<H>;
    [TYPES.USE_CASES.getBalances]: () => UseCaseGetBalances<H>;
    [TYPES.USE_CASES.updateOrderbook]: () => UseCaseUpdateOrderbook<H>;
    [TYPES.USE_CASES.updateTrades]: () => UseCaseUpdateTrades<H>;
    [TYPES.USE_CASES.subscription]: () => UseCaseSubscription<H>;
    [TYPES.USE_CASES.getProgress]: () => UseCaseGetProgress<H>;
    abstract [TYPES.FACADES.config]: () => LatencyConfig;
    [TYPES.FACADES.instant]: () => Instant<H>;
    [TYPES.FACADES.userMarket]: () => UserMarketFacade<H>;
    [TYPES.FACADES.userAccount]: () => UserAccountFacade<H>;
    [TYPES.FACADES.admin]: () => AdminFacade<H>;
    [TYPES.texchange]: () => Texchange<H>;
    constructor(vmctx: VirtualMachineContextLike<H>);
}
export interface CreateTexchange<H extends HLike<H>> {
    (vmctx: VirtualMachineContextLike<H>): Texchange<H>;
}
