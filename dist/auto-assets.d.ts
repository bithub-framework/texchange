import { ExAssets, InitialAssets, Config } from './interfaces';
import Big from 'big.js';
declare class AutoAssets implements ExAssets {
    protected config: Config;
    private getSettlementPrice;
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    frozenMargin: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    time: number;
    constructor(config: Config, getSettlementPrice: () => Big);
    protected _margin: Big;
    get margin(): Big;
    get reserve(): Big;
    get closable(): {
        [x: number]: Big;
    };
    toJSON(): ExAssets;
}
export { AutoAssets as default, AutoAssets, InitialAssets, };
