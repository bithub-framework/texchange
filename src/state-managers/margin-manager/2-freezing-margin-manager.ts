import {
    Length,
    Config,
} from '../../interfaces';
import { MarginManager as Parent } from './1-position-margin-manager';
import Big from 'big.js';
import { Frozen } from '../open-maker-manager';
import { EquityManager } from '../equity-manager';
import { Core } from '../../6-snapshot';



export abstract class MarginManager extends Parent {
    protected abstract equity: EquityManager;
    protected abstract config: Config;
    public abstract frozenBalance: Big;
    public abstract frozenPosition: {
        [length: number]: Big;
    };
    protected abstract core: Core;

    public get available(): Big {
        return this.equity.balance
            .minus(this.config.calcTotalPositionMargin({
                spec: this.config,
                latestPrice: this.core.latestPrice,
                markPrice: this.core.markPrice,
                time: this.core.now(),
                position: this.equity.position,
                cost: this.equity.cost,
                balance: this.equity.balance,
                positionMargin: this.positionMargin,
                frozenBalance: this.frozenBalance,
                frozenPosition: this.frozenPosition,
            }))
            .minus(this.frozenBalance);

    }

    public get closable() {
        return {
            [Length.LONG]: this.equity.position[Length.LONG]
                .minus(this.frozenPosition[Length.LONG]),
            [Length.SHORT]: this.equity.position[Length.SHORT]
                .minus(this.frozenPosition[Length.SHORT]),
        };
    }

    public freeze(frozen: Frozen) {
        this.frozenBalance = this.frozenBalance.plus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].plus(frozen.position);
        if (this.available.lt(0) || this.closable[frozen.length].lt(0)) {
            this.thaw(frozen);
            throw new Error('No enough to freeze');
        }
    }

    public thaw(frozen: Frozen) {
        this.frozenBalance = this.frozenBalance.minus(frozen.balance);
        this.frozenPosition[frozen.length] = this.frozenPosition[frozen.length].minus(frozen.position);
        if (this.frozenBalance.lt(0) || this.frozenPosition[frozen.length].lt(0)) {
            this.freeze(frozen);
            throw new Error('No enough to thaw');
        }
    }
}
