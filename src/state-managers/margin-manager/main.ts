import {
    Length,
    Config,
} from '../../interfaces';
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
export function makeEmptyMarginSnapshot(): MarginSnapshot {
    return {
        frozenPosition: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        frozenBalance: new Big(0),
        positionMargin: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
    }
}

export interface MarginManagerProps {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: {
        [length: number]: Big;
    };
}

export class MarginManager extends Parent implements MarginManagerProps {
    public positionMargin: {
        [length: number]: Big;
    };
    public frozenBalance: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        protected config: Config,
        snapshot: MarginSnapshot,
        protected equity: EquityManager,
        protected core: Core,
    ) {
        super();
        this.frozenBalance = snapshot.frozenBalance;
        this.frozenPosition = {
            [Length.LONG]: snapshot.frozenPosition[Length.LONG],
            [Length.SHORT]: snapshot.frozenPosition[Length.SHORT],
        };
        this.positionMargin = {
            [Length.LONG]: snapshot.positionMargin[Length.LONG],
            [Length.SHORT]: snapshot.positionMargin[Length.SHORT],
        };
    }

    /** @returns 可直接 JSON 序列化 */
    public capture(): MarginSnapshot {
        return {
            frozenPosition: this.frozenPosition,
            frozenBalance: this.frozenBalance,
            positionMargin: this.positionMargin,
        };
    }

    public [inspect.custom]() {
        return JSON.stringify({
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
            positionMargin: this.positionMargin,
        });
    }
}
