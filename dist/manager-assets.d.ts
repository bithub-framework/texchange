/// <reference types="node" />
import { AutoAssets, Config, Length } from './interfaces';
import Big from 'big.js';
import { Frozen } from './manager-open-orders';
import util from 'util';
declare class AssetsManager extends AutoAssets {
    private config;
    constructor(config: Config);
    freeze({ margin, position, length }: Frozen): void;
    thaw({ margin, position, length }: Frozen): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    [util.inspect.custom](): import("interfaces/dist/data").Assets;
}
export { AssetsManager as default, AssetsManager, };
