import { Config } from '../../interfaces';
import { MarginManager as Parent } from './1-position-margin-manager';
import Big from 'big.js';
import { Frozen } from '../open-maker-manager';
import { EquityManager } from '../equity-manager';
import { Core } from '../../6-snapshot';
export declare abstract class MarginManager extends Parent {
    protected abstract equity: EquityManager;
    protected abstract config: Config;
    abstract frozenBalance: Big;
    abstract frozenPosition: {
        [length: number]: Big;
    };
    protected abstract core: Core;
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    freeze(frozen: Frozen): void;
    thaw(frozen: Frozen): void;
}
