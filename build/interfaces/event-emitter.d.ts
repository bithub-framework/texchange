import { MarketEventEmitterLike as GenericMarketEventEmitterLike, AccountEventEmitterLike as GenericAccountEventEmitterLike, HLike } from 'interfaces';
import { OrderId } from './order-id';
import { TradeId } from './trade-id';
export interface MarketEventEmitterLike<H extends HLike<H>> extends GenericMarketEventEmitterLike<H, OrderId, TradeId> {
}
export interface AccountEventEmitterLike<H extends HLike<H>> extends GenericAccountEventEmitterLike<H, OrderId, TradeId> {
}
