import { HLike } from 'interfaces';
import { TradeId } from './trade-id';
import { Trade as GenericTrade, TradeStatic as GenericTradeStatic } from 'interfaces';
export declare namespace Trade {
    export import Snapshot = GenericTrade.Snapshot;
}
export interface Trade<H extends HLike<H>> extends GenericTrade<H, TradeId> {
}
export declare class TradeStatic<H extends HLike<H>> extends GenericTradeStatic<H, TradeId> {
}
