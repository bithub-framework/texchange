import { OrderId, Config, Length, OpenMaker, Snapshot } from '../interfaces';
import Big from 'big.js';
export interface Frozen {
    balance: Big;
    position: Big;
    length: Length;
}
export declare type OpenMakersSnapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];
export declare class OpenMakerManager extends Map<OrderId, OpenMaker> {
    private config;
    private getSettlementPrice;
    private getLatestPrice;
    private frozens;
    constructor(config: Config, snapshot: OpenMakersSnapshot, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    capture(): Snapshot['openMakers'];
    addOrder(order: OpenMaker): Frozen;
    takeOrder(oid: OrderId, volume: Big, dollarVolume: Big): Frozen;
    removeOrder(oid: OrderId): Frozen | null;
    private calcThawedBalance;
}
