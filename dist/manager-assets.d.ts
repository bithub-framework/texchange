/// <reference types="node" />
import { Assets, Config, Length } from './interfaces';
import Big from 'big.js';
import { Frozen } from './manager-open-order';
import util from 'util';
declare class AssetsManager extends Assets.AutoAssets {
    private config;
    constructor(config: Config);
    freeze({ margin, position, length }: Frozen): void;
    thaw({ margin, position, length }: Frozen): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    [util.inspect.custom](): Assets;
}
export { AssetsManager as default, AssetsManager, };
