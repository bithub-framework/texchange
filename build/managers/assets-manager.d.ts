/// <reference types="node" />
import { Length, Config, Snapshot } from '../interfaces';
import AutoAssets from './auto-assets';
import Big from 'big.js';
import { Frozen } from './open-maker-manager';
import { inspect } from 'util';
declare class AssetsManager extends AutoAssets {
    constructor(config: Config, snapshot: Snapshot, getSettlementPrice: () => Big, getLatestPrice: () => Big);
    freeze(frozen: Frozen): void;
    thaw(frozen: Frozen): void;
    incMargin(price: Big, volume: Big): void;
    decMargin(volume: Big): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    [inspect.custom](): import("../interfaces").Assets;
}
export { AssetsManager as default, AssetsManager, };
