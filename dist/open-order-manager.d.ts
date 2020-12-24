import { OrderId, Config, OpenOrder, Length } from './interfaces';
import Big from 'big.js';
interface Frozen {
    margin: Big;
    position: Big;
    length: Length;
}
declare class OpenOrderManager extends Map<OrderId, OpenOrder> {
    private config;
    private frozens;
    constructor(config: Config);
    addOrder(order: OpenOrder): [OpenOrder, Frozen];
    takeOrder(oid: OrderId, volume: Big, dollarVolume: Big): Frozen;
    removeOrder(oid: OrderId): Frozen;
    private calcReleasedMargin;
}
export { OpenOrderManager as default, OpenOrderManager, Frozen, };
