import {
    Length,
    StatefulLike,
    Parsed,
} from '../interfaces';
// import { inspect } from 'util';
import Big from 'big.js';
import { Hub } from '../hub';


export interface Snapshot {
    position: { [length: number]: Big; };
    balance: Big;
    cost: { [length: number]: Big; };
}

export class StateAssets implements StatefulLike<Snapshot> {
    public position: { [length: number]: Big; };
    public balance: Big;
    public cost: { [length: number]: Big; };

    constructor(private core: Hub) {
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

    public capture(): Snapshot {
        return {
            position: {
                [Length.LONG]: this.position[Length.LONG],
                [Length.SHORT]: this.position[Length.SHORT],
            },
            cost: {
                [Length.LONG]: this.cost[Length.LONG],
                [Length.SHORT]: this.cost[Length.SHORT],
            },
            balance: this.balance,
        };
    }

    public restore(snapshot: Parsed<Snapshot>): void {
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

    public payFee(fee: Big): void {
        this.balance = this.balance.minus(fee);
    }

    public openPosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
    ): void {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
    }

    /**
     * @returns Profit.
     */
    public closePosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
    ): Big {
        if (volume.lte(this.position[length])) {
            const cost = this.cost[length]
                .times(volume)
                .div(this.position[length])
                .round(this.core.config.CURRENCY_DP);
            const profit = dollarVolume.minus(cost).times(length);
            this.position[length] = this.position[length].minus(volume);
            this.cost[length] = this.cost[length].minus(cost);
            this.balance = this.balance.plus(profit);
            return profit;
        } else  /* volume.gt(this.position[length]) */ {
            const restVolume = volume.minus(this.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.core.config.CURRENCY_DP);
            const profit = this.closePosition(
                length,
                this.position[length],
                dollarVolume.minus(restDollarVolume),
            );
            this.openPosition(
                -length,
                restVolume,
                restDollarVolume,
            );
            return profit;
        }
    }

    // public [inspect.custom]() {
    //     return JSON.stringify({
    //         balance: this.balance,
    //         cost: this.cost,
    //         position: this.position,
    //     });
    // }
}
