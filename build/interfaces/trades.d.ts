import { HLike } from 'interfaces';
import { TradeId } from './trade-id';
import { Trades as GenericTrades, TradesStatic as GenericTradesStatic } from 'interfaces';
export declare namespace Trades {
    export import Snapshot = GenericTrades.Snapshot;
}
export interface Trades<H extends HLike<H>> extends GenericTrades<H, TradeId> {
}
export declare class TradesStatic<H extends HLike<H>> extends GenericTradesStatic<H, TradeId> {
}