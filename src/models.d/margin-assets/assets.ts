import {
    Length,
    Position,
    HLike, H, HStatic,
    MarketSpec,
} from 'secretary-like';
import { Context } from '../../context';
import assert = require('assert');
import { StatefulLike } from '../../stateful-like';
import { Executed } from '../../interfaces/executed';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';


export class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    private Cost = new Assets.CostStatic(this.context.Data.H);

    private $position: Position<H>;
    private $cost: Assets.Cost<H>;

    public constructor(
        @inject(TYPES.context)
        protected context: Context<H>,
        @inject(TYPES.marketSpec)
        protected marketSpec: MarketSpec<H>,
        @inject(TYPES.MODELS.initialBalance)
        protected balance: H,
    ) {
        this.$position = {
            [Length.LONG]: new this.context.Data.H(0),
            [Length.SHORT]: new this.context.Data.H(0),
        };
        this.$cost = {
            [Length.LONG]: new this.context.Data.H(0),
            [Length.SHORT]: new this.context.Data.H(0),
        };
    }

    public getBalance(): H {
        return this.balance;
    }

    public getPosition(): Position<H> {
        return this.context.Data.Position.copy(this.$position);
    }

    public getCost(): Assets.Cost<H> {
        return this.Cost.copy(this.$cost);
    }

    public capture(): Assets.Snapshot {
        return {
            position: this.context.Data.Position.capture(this.$position),
            cost: this.Cost.capture(this.$cost),
            balance: this.context.Data.H.capture(this.balance),
        };
    }

    public restore(snapshot: Assets.Snapshot): void {
        this.balance = this.context.Data.H.restore(snapshot.balance);
        this.$position = this.context.Data.Position.restore(snapshot.position);
        this.$cost = this.Cost.restore(snapshot.cost);
    }

    public pay(fee: H): void {
        this.balance = this.balance.minus(fee);
    }

    public open({
        length,
        volume,
        dollarVolume,
    }: Executed<H>): void {
        this.$position[length] = this.$position[length].plus(volume);
        this.$cost[length] = this.$cost[length].plus(dollarVolume);
    }

    /**
     *
     * @returns Profit
     */
    public close({
        length,
        volume,
        dollarVolume,
    }: Executed<H>): H {
        assert(volume.lte(this.$position[length]));
        const cost = this.$position[length].neq(0)
            ? this.$cost[length]
                .times(volume)
                .div(this.$position[length])
                .round(this.marketSpec.CURRENCY_DP)
            : new this.context.Data.H(0);
        const profit = dollarVolume.minus(cost).times(length);
        this.$position[length] = this.$position[length].minus(volume);
        this.$cost[length] = this.$cost[length].minus(cost);
        this.balance = this.balance.plus(profit);
        return profit;
    }

    /**
     * @returns Profit
     */
    public settle(
        length: Length,
        settlementPrice: H,
    ): H {
        const dollarVolume = this.marketSpec.dollarVolume(
            settlementPrice, this.$position[length],
        ).round(this.marketSpec.CURRENCY_DP);
        const executed: Executed<H> = {
            length,
            volume: this.$position[length],
            dollarVolume,
        };
        const profit = this.close(executed);
        this.open(executed);
        return profit;
    }
}


export namespace Assets {
    export interface Snapshot {
        position: Position.Snapshot;
        balance: H.Snapshot;
        cost: Cost.Snapshot;
    }

    export interface Cost<H extends HLike<H>> {
        [length: Length]: H;
    }

    export namespace Cost {
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

        public restore(snapshot: Cost.Snapshot): Cost<H> {
            return {
                [Length.LONG]: this.H.restore(snapshot[Length.LONG]),
                [Length.SHORT]: this.H.restore(snapshot[Length.SHORT]),
            };
        }

        public copy(cost: Cost<H>): Cost<H> {
            return {
                [Length.LONG]: cost[Length.LONG],
                [Length.SHORT]: cost[Length.SHORT],
            };
        }
    }
}
