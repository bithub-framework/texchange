import { TradeId as GenericTradeId, TradeIdStatic as GenericTradeIdStatic } from 'interfaces';
export declare type TradeId = number | string;
export declare namespace TradeId {
    export import Snapshot = GenericTradeId.Snapshot;
}
export declare class TradeIdStatic implements GenericTradeIdStatic<TradeId> {
    capture(id: TradeId): TradeId.Snapshot;
    restore(snapshot: TradeId.Snapshot): TradeId;
}
