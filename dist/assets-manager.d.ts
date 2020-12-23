import { Assets, Config, Length, Side } from './interfaces';
import Big from 'big.js';
import { FreezeInfo } from './open-order-manager';
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
    freeze({ fee, margin, position, length }: FreezeInfo): void;
    release({ fee, margin, position, length }: FreezeInfo): void;
    openPosition(length: Length | Side, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length | Side, volume: Big, dollarVolume: Big, fee: Big): void;
}
export { AssetsManager as default, AssetsManager, };
