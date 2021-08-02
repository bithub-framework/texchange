import { OrderId, Config, Length, OpenMaker } from '../interfaces';
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
export declare function makeEmptyOpenMakersSnapshot(): OpenMakersSnapshot;
export declare class OpenMakerManager extends Map<OrderId, OpenMaker> {
    private config;
    private getClearingPrice;
    private getLatestPrice;
    private frozens;
    constructor(config: Config, snapshot: OpenMakersSnapshot, getClearingPrice: () => Big, getLatestPrice: () => Big);
    capture(): OpenMakersSnapshot;
    addOrder(order: OpenMaker): Frozen;
    takeOrder(oid: OrderId, volume: Big, dollarVolume: Big): Frozen;
    removeOrder(oid: OrderId): Frozen | null;
    private calcThawedBalance;
}
