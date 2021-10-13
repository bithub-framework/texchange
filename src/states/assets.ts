import {
    Length,
    StateLike,
    TypeRecur,
} from '../interfaces';
import { inspect } from 'util';
import Big from 'big.js';
import { Core } from '../core';


export interface Snapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}


export class StateAssets implements StateLike<Snapshot> {
    public position: {
        [length: number]: Big;
    };
    public balance: Big;
    public cost: {
        [length: number]: Big;
    };

    constructor(
        private core: Core,
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        if (snapshot) {
            this.balance = new Big(snapshot.balance);
            this.position = {
                [Length.LONG]: new Big(snapshot.position[Length.LONG]),
                [Length.SHORT]: new Big(snapshot.position[Length.SHORT]),
            };
            this.cost = {
                [Length.LONG]: new Big(snapshot.cost[Length.LONG]),
                [Length.SHORT]: new Big(snapshot.cost[Length.SHORT]),
            };
        } else {
            this.balance = this.core.config.initialBalance;
            this.position = {
                [Length.LONG]: new Big(0),
                [Length.SHORT]: new Big(0),
            };
            this.cost = {
                [Length.LONG]: new Big(0),
                [Length.SHORT]: new Big(0),
            };
        }
    }

    public capture(): Snapshot {
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
    ): Big {
        const cost = volume.eq(this.position[length])
            ? this.cost[length]
            : this.core.calculation.dollarVolume(
                this.cost[length].div(this.position[length]),
                volume,
            ).round(this.core.config.CURRENCY_DP);
        const profit = length === Length.LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance
            .plus(profit)
            .minus(fee);
        return profit;
    }

    public [inspect.custom]() {
        return JSON.stringify({
            balance: this.balance,
            cost: this.cost,
            position: this.position,
        });
    }
}
