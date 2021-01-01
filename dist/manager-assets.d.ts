/// <reference types="node" />
import { Length, Config } from './interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import { Frozen } from './manager-open-orders';
import util from 'util';
declare class AssetsManager extends AutoAssets {
    constructor(config: Config, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    freeze({ margin, position, length }: Frozen): void;
    thaw({ margin, position, length }: Frozen): void;
    incMargin(price: Big, volume: Big): void;
    decMargin(volume: Big): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    [util.inspect.custom](): import("./interfaces").ExAssets;
}
export { AssetsManager as default, AssetsManager, };
