import {
    Length,
    Config,
} from '../interfaces';
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


export function makeEmptyEquitySnapshot(balance: Big): EquitySnapshot {
    return {
        position: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        cost: {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        },
        balance,
    }
}

export interface EquityManagerProps {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}

export class EquityManager implements EquityManagerProps {
    public position: {
        [length: number]: Big;
    };
    public balance: Big;
    public cost: {
        [length: number]: Big;
    };

    constructor(
        protected config: Config,
        snapshot: EquitySnapshot,
    ) {
        this.balance = new Big(snapshot.balance);
        this.position = {
            [Length.LONG]: new Big(snapshot.position[Length.LONG]),
            [Length.SHORT]: new Big(snapshot.position[Length.SHORT]),
        };
        this.cost = {
            [Length.LONG]: new Big(snapshot.cost[Length.LONG]),
            [Length.SHORT]: new Big(snapshot.cost[Length.SHORT]),
        };
    }

    /** @returns 可直接 JSON 序列化 */
    public capture(): EquitySnapshot {
        return {
            position: this.position,
            cost: this.cost,
            balance: this.balance,
        };
    }


    public openPosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
        fee: Big,
    ): void {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
        this.balance = this.balance.minus(fee);
    }

    public closePosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
        fee: Big,
    ): void {
        const cost = volume.eq(this.position[length])
            ? this.cost[length]
            : this.config.calcDollarVolume(
                this.cost[length].div(this.position[length]),
                volume,
            ).round(this.config.CURRENCY_DP);
        const profit = length === Length.LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance
            .plus(profit)
            .minus(fee);
    }

    public [inspect.custom]() {
        return this.toJSON();
    }

    public toJSON(): EquityManagerProps {
        return {
            balance: this.balance,
            cost: this.cost,
            position: this.position,
        }
    }
}
