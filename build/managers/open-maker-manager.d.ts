import { OrderId, Config, Length, OpenMaker } from '../interfaces';
import Big from 'big.js';
interface Frozen {
    balance: Big;
    position: Big;
    length: Length;
}
declare class OpenMakerManager extends Map<OrderId, OpenMaker> {
    private config;
    private getSettlementPrice;
    private getLatestPrice;
    private frozens;
    constructor(config: Config, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    addOrder(order: OpenMaker): Frozen;
    takeOrder(oid: OrderId, volume: Big, dollarVolume: Big): Frozen;
    removeOrder(oid: OrderId): Frozen | null;
    private calcThawedBalance;
}
export { OpenMakerManager as default, OpenMakerManager, Frozen, };
