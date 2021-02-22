import { ExAssets, Length, Config } from './interfaces';
import Big from 'big.js';
declare class AutoAssets implements ExAssets {
    protected config: Config;
    private getSettlementPrice;
    private getLatestPrice;
    position: {
        [Length.LONG]: Big;
        [Length.SHORT]: Big;
    };
    balance: Big;
    cost: {
        [Length.LONG]: Big;
        [Length.SHORT]: Big;
    };
    frozenMargin: Big;
    frozenPosition: {
        [Length.LONG]: Big;
        [Length.SHORT]: Big;
    };
    constructor(config: Config, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    protected autoMargin: Big;
    get margin(): Big;
    get reserve(): Big;
    get closable(): {
        LONG: Big;
        SHORT: Big;
    };
    toJSON(): ExAssets;
}
export { AutoAssets as default, AutoAssets, };
