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
    freezeMargin(increment: Big, openOrder?: DetailedOpenOrder): void;
    releaseMargin(decrement: Big, openOrder?: DetailedOpenOrder): void;
    freezePosition(increment: Big, length: Length | Side): void;
    releasePosition(decrement: Big, length: Length | Side): void;
    freezeFee(increment: Big, openOrder?: DetailedOpenOrder): void;
    releaseFee(decrement: Big, openOrder?: DetailedOpenOrder): void;
}
export { AssetsManager as default, AssetsManager, };
