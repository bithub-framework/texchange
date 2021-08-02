import { MarginManager as Parent } from './1-position-margin-manager';
import Big from 'big.js';
import { Frozen } from '../open-maker-manager';
export declare abstract class MarginManager extends Parent {
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
