/// <reference types="node" />
import { Config } from '../../interfaces';
import { MarginManager as Parent } from './2-freezing-margin-manager';
import Big from 'big.js';
import { inspect } from 'util';
import { EquityManager } from '../equity-manager';
export interface MarginSnapshot {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: Big;
}
export declare function makeEmptyMarginSnapshot(): MarginSnapshot;
export interface MarginManagerProps {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: Big;
    available: Big;
    closable: {
        [length: number]: Big;
    };
}
export declare class MarginManager extends Parent implements MarginManagerProps {
    protected config: Config;
    protected getClearingPrice: () => Big;
    protected getLatestPrice: () => Big;
    protected equity: EquityManager;
    positionMargin: Big;
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    constructor(config: Config, snapshot: MarginSnapshot, getClearingPrice: () => Big, getLatestPrice: () => Big, equity: EquityManager);
    /** @returns 可直接 JSON 序列化 */
    capture(): MarginSnapshot;
    [inspect.custom](): MarginManagerProps;
    toJSON(): MarginManagerProps;
}
