import {
    Length,
    ConcretePosition,
    Position,
    HLike,
    H,
} from 'interfaces';
import { Context } from '../context';
import { Model } from '../model';
import assert = require('assert');



export class Assets<H extends HLike<H>> extends Model<H, Assets.Snapshot> {
    private position: ConcretePosition.MutablePlain<H>;
    private balance: H;
    private cost: Assets.Cost.MutablePlain<H>;

    constructor(
        protected readonly context: Context<H>,
    ) {
        super();

        this.balance = this.context.config.account.initialBalance;
        this.position = {
            [Length.LONG]: this.context.H.from(0),
            [Length.SHORT]: this.context.H.from(0),
        };
        this.cost = {
            [Length.LONG]: this.context.H.from(0),
            [Length.SHORT]: this.context.H.from(0),
        };
    }

    public getBalance(): H {
        return this.balance;
    }

    public getPosition(): Readonly<ConcretePosition<H>> {
        return this.position;
    }

    public getCost(): Readonly<Assets.Cost<H>> {
        return this.cost;
    }

    public capture(): Assets.Snapshot {
        return {
            position: {
                [Length.LONG]: this.context.H.capture(this.position[Length.LONG]),
                [Length.SHORT]: this.context.H.capture(this.position[Length.SHORT]),
            },
            cost: {
                [Length.LONG]: this.context.H.capture(this.cost[Length.LONG]),
                [Length.SHORT]: this.context.H.capture(this.cost[Length.SHORT]),
            },
            balance: this.context.H.capture(this.balance),
        };
    }

    public restore(snapshot: Assets.Snapshot): void {
        this.balance = this.context.H.from(snapshot.balance);
        this.position = {
            [Length.LONG]: this.context.H.from(snapshot.position[Length.LONG]),
            [Length.SHORT]: this.context.H.from(snapshot.position[Length.SHORT]),
        };
        this.cost = {
            [Length.LONG]: this.context.H.from(snapshot.cost[Length.LONG]),
            [Length.SHORT]: this.context.H.from(snapshot.cost[Length.SHORT]),
        };
    }

    public payFee(fee: H): void {
        this.balance = this.balance.minus(fee);
    }

    public open({
        length,
        volume,
        dollarVolume,
    }: Readonly<Assets.Volumes<H>>): void {
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
    }: Readonly<Assets.Volumes<H>>): H {
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
    }
}


export namespace Assets {
    export interface Cost<H extends HLike<H>> {
        readonly [length: Length]: H;
    }
    export namespace Cost {
        export interface MutablePlain<H extends HLike<H>> {
            [length: Length]: H;
        }
        export interface Snapshot {
            readonly [length: Length]: H.Snapshot;
        }
    }

    export interface Volumes<H extends HLike<H>> {
        readonly length: Length;
        readonly volume: H;
        readonly dollarVolume: H;
    }

    export interface Snapshot {
        readonly position: Position.Snapshot;
        readonly balance: H.Snapshot;
        readonly cost: Cost.Snapshot;
    }
}
