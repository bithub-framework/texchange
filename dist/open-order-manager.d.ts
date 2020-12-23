import { OrderId, Config, OpenOrder, LimitOrder, Length } from './interfaces';
import Big from 'big.js';
interface FreezeInfo {
    fee: Big;
    margin: Big;
    position: Big;
    length: Length;
}
declare class OpenOrderManager {
    private config;
    private openOrders;
    private freezeInfos;
    constructor(config: Config);
    create(oid: OrderId, limit: LimitOrder): [OpenOrder, FreezeInfo];
    take(oid: OrderId, volume: Big, dollarVolume: Big): FreezeInfo;
    delete(oid: OrderId): FreezeInfo;
    getOpenOrders(): Map<OrderId, OpenOrder>;
    private releaseMargin;
    private releaseFee;
    private releasePosition;
}
export { OpenOrderManager as default, OpenOrderManager, FreezeInfo, };
