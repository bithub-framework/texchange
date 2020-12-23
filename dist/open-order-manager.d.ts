import { OrderId, Config, OpenOrder, LimitOrder, Length } from './interfaces';
import Big from 'big.js';
interface Frozen {
    margin: Big;
    position: Big;
    length: Length;
}
declare class OpenOrderManager {
    private config;
    private openOrders;
    private frozens;
    constructor(config: Config);
    addOrder(oid: OrderId, limit: LimitOrder): [OpenOrder, Frozen];
    take(oid: OrderId, volume: Big, dollarVolume: Big): Frozen;
    delete(oid: OrderId): Frozen;
    getOpenOrders(): Map<import("interfaces/dist/data").TradeId, OpenOrder>;
    private calcReleasedMargin;
}
export { OpenOrderManager as default, OpenOrderManager, Frozen, };
