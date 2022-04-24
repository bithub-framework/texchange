import { HLike } from 'interfaces';
import { OpenOrder as GenericOpenOrder, OpenOrderStatic as GenericOpenOrderStatic } from 'interfaces';
import { OrderId } from './order-id';
export interface OpenOrder<H extends HLike<H>> extends GenericOpenOrder<H, OrderId> {
}
export declare class OpenOrderStatic<H extends HLike<H>> extends GenericOpenOrderStatic<H, OrderId> {
}
export declare namespace OpenOrder {
    export import Snapshot = GenericOpenOrder.Snapshot;
}
