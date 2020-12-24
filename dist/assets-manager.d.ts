import { Assets, Config, Length, Side } from './interfaces';
import Big from 'big.js';
import { Frozen } from './open-order-manager';
declare class AssetsManager extends Assets {
    private config;
    constructor(config: Config);
    get margin(): Big;
    get reserve(): Big;
    freeze({ margin, position, length }: Frozen): void;
    thaw({ margin, position, length }: Frozen): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length | Side, volume: Big, dollarVolume: Big, fee: Big): void;
}
export { AssetsManager as default, AssetsManager, };
