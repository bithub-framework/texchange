import {
	TradeId as GenericTradeId,
	TradeIdStatic as GenericTradeIdStatic,
} from 'interfaces';


export type TradeId = number | string;

export namespace TradeId {
	export import Snapshot = GenericTradeId.Snapshot;
}

export class TradeIdStatic implements GenericTradeIdStatic<TradeId> {
	public capture(id: TradeId): TradeId.Snapshot {
		return id;
	}

	public restore(snapshot: TradeId.Snapshot): TradeId {
		return snapshot;
	}
}
