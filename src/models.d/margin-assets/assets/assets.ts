import {
    Length,
    Position,
    HLike, H,
    MarketSpec,
} from 'secretary-like';
import { Cost, CostFactory } from './cost';
import { Context } from '../../../context';
import assert = require('assert');
import { StatefulLike } from '../../../stateful-like';
import { Executed } from '../../../data-types/executed';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../../injection/types';


export class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    private Cost = new CostFactory<H>(this.context.dataTypes.hFactory);

    private $position: Position<H>;
    private $cost: Cost<H>;

    public constructor(
        @inject(TYPES.context)
        protected context: Context<H>,
        @inject(TYPES.marketSpec)
        protected marketSpec: MarketSpec<H>,
        @inject(TYPES.MODELS.initialBalance)
        protected balance: H,
    ) {
        this.$position = new Position<H>(
            this.context.dataTypes.hFactory.from(0),
            this.context.dataTypes.hFactory.from(0),
        );
        this.$cost = new Cost<H>(
            this.context.dataTypes.hFactory.from(0),
            this.context.dataTypes.hFactory.from(0)
        );
    }

    public getBalance(): H {
        return this.balance;
    }

    public getPosition(): Position<H> {
        return this.context.dataTypes.positionFactory.copy(this.$position);
    }

    public getCost(): Cost<H> {
        return this.Cost.copy(this.$cost);
    }

    public capture(): Assets.Snapshot {
        return {
            position: this.context.dataTypes.positionFactory.capture(this.$position),
            cost: this.Cost.capture(this.$cost),
            balance: this.context.dataTypes.hFactory.capture(this.balance),
        };
    }

    public restore(snapshot: Assets.Snapshot): void {
        this.balance = this.context.dataTypes.hFactory.restore(snapshot.balance);
        this.$position = this.context.dataTypes.positionFactory.restore(snapshot.position);
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
        this.$position.set(length, this.$position.get(length).plus(volume));
        this.$cost.set(length, this.$cost.get(length).plus(dollarVolume));
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
        assert(volume.lte(this.$position.get(length)));
        const cost = this.$position.get(length).neq(0)
            ? this.$cost.get(length)
                .times(volume)
                .div(this.$position.get(length))
                .round(this.marketSpec.CURRENCY_DP)
            : this.context.dataTypes.hFactory.from(0);
        const profit = length === Length.LONG
            ? dollarVolume.minus(cost)
            : dollarVolume.minus(cost).neg();
        this.$position.set(length, this.$position.get(length).minus(volume));
        this.$cost.set(length, this.$cost.get(length).minus(cost));
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
            settlementPrice, this.$position.get(length),
        ).round(this.marketSpec.CURRENCY_DP);
        const executed: Executed<H> = {
            length,
            volume: this.$position.get(length),
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
}
