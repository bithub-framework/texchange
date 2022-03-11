import {
    Length,
    ReadonlyRecur,
    JsonCompatible,
    Position,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Model } from '../model';
import assert = require('assert');



export class Assets extends Model<Assets.Snapshot> {
    private position: Position;
    private balance: Big;
    private cost: Assets.Cost;

    constructor(
        protected readonly context: Context,
    ) {
        super();

        this.balance = this.context.config.account.initialBalance;
        this.position = {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        };
        this.cost = {
            [Length.LONG]: new Big(0),
            [Length.SHORT]: new Big(0),
        };
    }

    public getBalance(): Big {
        return this.balance;
    }

    public getPosition(): Readonly<Position> {
        return this.position;
    }

    public getCost(): Readonly<Assets.Cost> {
        return this.cost;
    }

    public capture(): Assets.Snapshot {
        return {
            position: {
                [Length.LONG]: this.position[Length.LONG].toString(),
                [Length.SHORT]: this.position[Length.SHORT].toString(),
            },
            cost: {
                [Length.LONG]: this.cost[Length.LONG].toString(),
                [Length.SHORT]: this.cost[Length.SHORT].toString(),
            },
            balance: this.balance.toString(),
        };
    }

    public restore(snapshot: Assets.Snapshot): void {
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

    public open({
        length,
        volume,
        dollarVolume,
    }: Assets.Volumes): void {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
    }

    /**
     * @returns Profit.
     */
    public close({
        length,
        volume,
        dollarVolume,
    }: Assets.Volumes): Big {
        assert(volume.lte(this.position[length]));
        const cost = this.cost[length]
            .times(volume)
            .div(this.position[length])
            .round(this.context.config.market.CURRENCY_DP);
        const profit = dollarVolume.minus(cost).times(length);
        this.position[length] = this.position[length].minus(volume);
        this.cost[length] = this.cost[length].minus(cost);
        this.balance = this.balance.plus(profit);
        return profit;
        /* volume.gt(this.position[length]) */ {
            // const restVolume = volume.minus(this.position[length]);
            // const restDollarVolume = dollarVolume
            //     .times(restVolume)
            //     .div(volume)
            //     .round(this.context.config.market.CURRENCY_DP);
            // const profit = this.closePosition({
            //     length,
            //     volume: this.position[length],
            //     dollarVolume: dollarVolume.minus(restDollarVolume),
            // });
            // this.openPosition({
            //     length: -length,
            //     volume: restVolume,
            //     dollarVolume: restDollarVolume,
            // });
            // return profit;
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


export namespace Assets {
    export interface Cost { [length: number]: Big; }

    export interface Volumes {
        readonly length: Length;
        readonly volume: Big;
        readonly dollarVolume: Big;
    }

    interface SnapshotStruct {
        position: Position;
        balance: Big;
        cost: Cost;
    }
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
