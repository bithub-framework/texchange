/// <reference types="node" />
import { Length, Config } from '../interfaces';
import { inspect } from 'util';
import Big from 'big.js';
export interface EquitySnapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}
export declare function makeEmptyEquitySnapshot(balance: Big): EquitySnapshot;
export interface EquityManagerProps {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}
export declare class EquityManager implements EquityManagerProps {
    protected config: Config;
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    constructor(config: Config, snapshot: EquitySnapshot);
    /** @returns 可直接 JSON 序列化 */
    capture(): EquitySnapshot;
    openPosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    closePosition(length: Length, volume: Big, dollarVolume: Big, fee: Big): void;
    [inspect.custom](): EquityManagerProps;
    toJSON(): EquityManagerProps;
}
