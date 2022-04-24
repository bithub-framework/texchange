import { OrderId as GenericOrderId, OrderIdStatic as GenericOrderIdStatic } from 'interfaces';
export declare type OrderId = number | string;
export declare namespace OrderId {
    export import Snapshot = GenericOrderId.Snapshot;
}
export declare class OrderIdStatic implements GenericOrderIdStatic<OrderId> {
    capture(id: OrderId): OrderId.Snapshot;
    restore(snapshot: OrderId.Snapshot): OrderId;
}
