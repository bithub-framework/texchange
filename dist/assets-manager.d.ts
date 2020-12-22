import { Assets, Config, Length, Side } from './interfaces';
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
    getFrozen(): Big;
    getMargin(): Big;
    getReserve(): Big;
    openPosition(length: Length | Side, volume: Big, dollarVolume: Big): void;
    closePosition(length: Length | Side, volume: Big, dollarVolume: Big): void;
    incBalance(increment: Big): void;
    decBalance(decrement: Big): void;
    freeze(increment: Big): void;
    release(decrement: Big): void;
}
export { AssetsManager as default, AssetsManager, };
