import { Assets, Config, Snapshot } from '../interfaces';
import Big from 'big.js';
declare class AutoAssets implements Assets {
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
    constructor(config: Config, snapshot: Snapshot, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    protected staticMargin: Big;
    get margin(): Big;
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    toJSON(): Assets;
}
export { AutoAssets as default, AutoAssets, };
