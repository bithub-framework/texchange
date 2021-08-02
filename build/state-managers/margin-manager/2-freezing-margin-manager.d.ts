import { MarginManager as Parent } from './1-position-margin-manager';
import Big from 'big.js';
import { Frozen } from '../open-maker-manager';
import { EquityManager } from '../equity-manager';
export declare abstract class MarginManager extends Parent {
    protected abstract equity: EquityManager;
    abstract frozenBalance: Big;
    abstract frozenPosition: {
        [length: number]: Big;
    };
    get available(): Big;
    get closable(): {
        [x: number]: Big;
    };
    freeze(frozen: Frozen): void;
    thaw(frozen: Frozen): void;
}
