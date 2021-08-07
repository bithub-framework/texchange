/// <reference types="node" />
import { Config } from '../../interfaces';
import { MarginManager as Parent } from './2-freezing-margin-manager';
import Big from 'big.js';
import { inspect } from 'util';
import { EquityManager } from '../equity-manager';
import { Core } from '../../6-snapshot';
export interface MarginSnapshot {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: {
        [length: number]: Big;
    };
}
export declare function makeEmptyMarginSnapshot(): MarginSnapshot;
export interface MarginManagerProps {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: {
        [length: number]: Big;
    };
}
export declare class MarginManager extends Parent implements MarginManagerProps {
    protected config: Config;
    protected equity: EquityManager;
    protected core: Core;
    positionMargin: {
        [length: number]: Big;
    };
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    constructor(config: Config, snapshot: MarginSnapshot, equity: EquityManager, core: Core);
    /** @returns 可直接 JSON 序列化 */
    capture(): MarginSnapshot;
    [inspect.custom](): string;
}
