import { Assets, InitialAssets } from './interfaces';
import Big from 'big.js';
declare class AutoAssets implements Assets {
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
    private leverage;
    private CURRENCY_DP;
    constructor(initialAssets: InitialAssets, leverage: number, CURRENCY_DP: number);
    get margin(): Big;
    get reserve(): Big;
    get closable(): {
        [x: number]: Big;
    };
    toJSON(): Assets;
}
export { AutoAssets as default, AutoAssets, InitialAssets, };
