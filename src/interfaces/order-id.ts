import {
	OrderId as GenericOrderId,
	OrderIdStatic as GenericOrderIdStatic,
} from 'interfaces';


export type OrderId = number | string;

export namespace OrderId {
	export import Snapshot = GenericOrderId.Snapshot;
}

export class OrderIdStatic implements GenericOrderIdStatic<OrderId> {
	public capture(id: OrderId): OrderId.Snapshot {
		return id;
	}

	public restore(snapshot: OrderId.Snapshot): OrderId {
		return snapshot;
	}
}
