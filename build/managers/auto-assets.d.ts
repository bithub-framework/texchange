import { Assets, Config } from '../interfaces';
import Big from 'big.js';
export interface AssetsSnapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    staticMargin: Big;
}
export declare function makeEmptySnapshot(balance: Big): AssetsSnapshot;
export declare class AutoAssets implements Assets {
    protected config: Config;
    private getSettlementPrice;
    private getLatestPrice;
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    constructor(config: Config, snapshot: AssetsSnapshot, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    capture(): AssetsSnapshot;
    protected staticMargin: Big;
    get margin(): Big;
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    toJSON(): Assets;
}
