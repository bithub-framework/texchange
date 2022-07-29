import {
	HLike, HStatic, HFactory,
	MarketSpecLike,
	AccountSpecLike,
} from 'secretary-like';
import { BaseContainer } from '@zimtsui/injektor';
import { TYPES } from './types';

// Context
import { Context } from '../context';
import { TimelineLike } from 'secretary-like';
import { DataTypesNamespace } from '../context/data-types-namespace';

// Models
import { Makers } from '../models.d/makers/makers';
import { Pricing } from '../models.d/pricing/pricing';
import { Assets } from '../models.d/margin-assets/assets/assets';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
import { MarginAssets } from '../models.d/margin-assets/margin-assets';

// Broadcast
import { Broadcast } from '../middlewares/broadcast';

// Mtm
import { Mtm } from '../mark-to-market/mtm';

// Middlewares
import { AvailableAssetsCalculator } from '../middlewares/available-assets-calculator/available-assets-calculator';
import { DatabaseTradeHandler } from '../middlewares/database-trade-handler';
import { Matcher } from '../middlewares/matcher';
import { OrderValidator } from '../middlewares/order-validator';


// UseCases
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


// Facades
import { Config as DelayConfig } from '../facades.d/config';
import { Instant } from '../facades.d/user-account/instant';
import { AdminFacade } from '../facades.d/admin';
import { UserMarketFacade } from '../facades.d/user-market';
import { UserAccountFacade } from '../facades.d/user-account';

// Texchange
import { Texchange } from '../texchange';


export abstract class Container<H extends HLike<H>> extends BaseContainer {
	public abstract [TYPES.marketSpec]: () => MarketSpecLike<H>;
	public abstract [TYPES.accountSpec]: () => AccountSpecLike;
	public abstract [TYPES.timeline]: () => TimelineLike;

	public abstract [TYPES.DataTypes]: () => DataTypesNamespace<H>;
	public [TYPES.context] = this.rcs<Context<H>>(Context);

	public abstract [TYPES.MODELS.initialBalance]: () => H;
	public abstract [TYPES.MODELS.makers]: () => Makers<H>;
	public abstract [TYPES.MODELS.pricing]: () => Pricing<H, any>;
	public [TYPES.MODELS.assets] = this.rcs<Assets<H>>(Assets);
	public abstract [TYPES.MODELS.marginAssets]: () => MarginAssets<H>;
	public [TYPES.MODELS.book] = this.rcs<Book<H>>(Book);
	public [TYPES.MODELS.progress] = this.rcs<Progress<H>>(Progress);

	public abstract [TYPES.MIDDLEWARES.availableAssetsCalculator]: () => AvailableAssetsCalculator<H>;
	public [TYPES.MIDDLEWARES.databaseTradeHandler] = this.rcs<DatabaseTradeHandler<H>>(DatabaseTradeHandler);
	public [TYPES.MIDDLEWARES.matcher] = this.rcs<Matcher<H>>(Matcher);
	public [TYPES.MIDDLEWARES.orderValidator] = this.rcs<OrderValidator<H>>(OrderValidator);
	public [TYPES.MIDDLEWARES.broadcast] = this.rcs<Broadcast<H>>(Broadcast);

	public abstract [TYPES.mtm]: () => Mtm<H> | null;

	public [TYPES.USE_CASES.makeOrder] = this.rcs<UseCaseMakeOrder<H>>(UseCaseMakeOrder);
	public [TYPES.USE_CASES.cancelOrder] = this.rcs<UseCaseCancelOrder<H>>(UseCaseCancelOrder);
	public [TYPES.USE_CASES.amendOrder] = this.rcs<UseCaseAmendOrder<H>>(UseCaseAmendOrder);
	public [TYPES.USE_CASES.getOpenOrders] = this.rcs<UseCaseGetOpenOrders<H>>(UseCaseGetOpenOrders);
	public [TYPES.USE_CASES.getPositions] = this.rcs<UseCaseGetPositions<H>>(UseCaseGetPositions);
	public [TYPES.USE_CASES.getBalances] = this.rcs<UseCaseGetBalances<H>>(UseCaseGetBalances);
	public [TYPES.USE_CASES.updateOrderbook] = this.rcs<UseCaseUpdateOrderbook<H>>(UseCaseUpdateOrderbook);
	public [TYPES.USE_CASES.updateTrades] = this.rcs<UseCaseUpdateTrades<H>>(UseCaseUpdateTrades);
	public [TYPES.USE_CASES.subscription] = this.rcs<UseCaseSubscription<H>>(UseCaseSubscription);
	public [TYPES.USE_CASES.getProgress] = this.rcs<UseCaseGetProgress<H>>(UseCaseGetProgress);

	public abstract [TYPES.FACADES.config]: () => DelayConfig;
	public [TYPES.FACADES.instant] = this.rcs<Instant<H>>(Instant);
	public [TYPES.FACADES.userMarket] = this.rcs<UserMarketFacade<H>>(UserMarketFacade);
	public [TYPES.FACADES.userAccount] = this.rcs<UserAccountFacade<H>>(UserAccountFacade);
	public [TYPES.FACADES.admin] = this.rcs<AdminFacade<H>>(AdminFacade);

	public [TYPES.texchange] = this.rcs<Texchange<H>>(Texchange);
}
