import {
    Length,
    Config,
} from '../../interfaces';
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

export function makeEmptyMarginSnapshot(): MarginSnapshot {
    return {
        frozenPosition: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        frozenBalance: new Big(0),
        positionMargin: new Big(0),
    }
}

export interface MarginManagerProps {
    frozenBalance: Big;
    frozenPosition: {
        [length: number]: Big;
    };
    positionMargin: Big;
    available: Big;
    closable: {
        [length: number]: Big;
    }
}

export class MarginManager extends Parent implements MarginManagerProps {
    public positionMargin: Big;
    public frozenBalance: Big;
    public frozenPosition: {
        [length: number]: Big;
    };

    constructor(
        protected config: Config,
        snapshot: MarginSnapshot,
        protected getClearingPrice: () => Big,
        protected getLatestPrice: () => Big,
        protected equity: EquityManager,
    ) {
        super();
        this.frozenBalance = new Big(snapshot.frozenBalance);
        this.frozenPosition = {
            [Length.LONG]: new Big(snapshot.frozenPosition[Length.LONG]),
            [Length.SHORT]: new Big(snapshot.frozenPosition[Length.SHORT]),
        };
        this.positionMargin = new Big(snapshot.positionMargin);
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
        return this.toJSON();
    }

    public toJSON(): MarginManagerProps {
        return {
            frozenBalance: this.frozenBalance,
            frozenPosition: this.frozenPosition,
            available: this.available,
            closable: this.closable,
            positionMargin: this.positionMargin,
        }
    }
}
