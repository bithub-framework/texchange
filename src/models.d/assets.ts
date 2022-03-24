import {
    Length,
    Position,
    HLike, H, HStatic,
    PositionStatic,
} from 'interfaces';
import { Context } from '../context/context';
import assert = require('assert');
import { StatefulLike } from 'startable';



export class Assets<H extends HLike<H>>
    implements StatefulLike<Assets.Snapshot> {

    private position: Position.MutablePlain<H>;
    private balance: H;
    private cost: Assets.Cost.MutablePlain<H>;

    private Position = new PositionStatic(this.context.H);
    private Cost = new Assets.CostStatic(this.context.H);

    public constructor(
        private readonly context: Context<H>,
    ) {
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

    public getPosition(): Position<H> {
        return this.position;
    }

    public getCost(): Assets.Cost<H> {
        return this.cost;
    }

    public capture(): Assets.Snapshot {
        return {
            position: this.Position.capture(this.position),
            cost: this.Cost.capture(this.cost),
            balance: this.context.H.capture(this.balance),
        };
    }

    public restore(snapshot: Assets.Snapshot): void {
        this.balance = this.context.H.from(snapshot.balance);
        this.position = this.Position.restore(snapshot.position);
        this.cost = this.Cost.restore(snapshot.cost);
    }

    public payFee(fee: H): void {
        this.balance = this.balance.minus(fee);
    }

    public open(
        {
            length,
            volume,
            dollarVolume,
        }: Assets.Volumes<H>,
    ): void {
        this.position[length] = this.position[length].plus(volume);
        this.cost[length] = this.cost[length].plus(dollarVolume);
    }

    /**
     * @returns Profit.
     */
    public close(
        {
            length,
            volume,
            dollarVolume,
        }: Assets.Volumes<H>,
    ): H {
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

    export class CostStatic<H extends HLike<H>> {
        public constructor(
            private H: HStatic<H>,
        ) { }

        public capture(cost: Cost<H>): Cost.Snapshot {
            return {
                [Length.LONG]: this.H.capture(cost[Length.LONG]),
                [Length.SHORT]: this.H.capture(cost[Length.SHORT]),
            };
        }

        public restore(snapshot: Cost.Snapshot): Cost.MutablePlain<H> {
            return {
                [Length.LONG]: this.H.from(snapshot[Length.LONG]),
                [Length.SHORT]: this.H.from(snapshot[Length.SHORT]),
            };
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
