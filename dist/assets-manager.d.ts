import { Assets, Config, Length, Side, DetailedOpenOrder } from './interfaces';
import Big from 'big.js';
declare class AssetsManager {
    private config;
    private assets;
    constructor(config: Config);
    getAssets(): Assets;
    getPosition(): {
        [length: number]: Big;
    };
    getLeverage(): number;
    getBalance(): Big;
    getCost(): {
        [length: number]: Big;
    };
    getFrozenFee(): Big;
    getFrozenMargin(): Big;
    getFrozenPosition(): {
        [length: number]: Big;
    };
    getMargin(): Big;
    getReserve(): Big;
    openPosition(length: Length | Side, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length | Side, volume: Big, dollarVolume: Big, fee: Big): void;
    freeze(margin: Big, fee: Big, position: Big, openOrder: DetailedOpenOrder): void;
    release(margin: Big, fee: Big, position: Big, openOrder: DetailedOpenOrder): void;
    private freezeMargin;
    private releaseMargin;
    private freezePosition;
    private releasePosition;
    private freezeFee;
    private releaseFee;
}
export { AssetsManager as default, AssetsManager, };
