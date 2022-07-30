import {
    Length,
    Position,
    HLike, H,
    MarketSpecLike,
} from 'secretary-like';
import { Cost, CostFactory } from './cost';
import { VirtualMachineContextLike } from '../../../vmctx';
import assert = require('assert');
import { StatefulLike } from '../../../stateful-like';
import { Executed } from '../../../data-types/executed';

import { inject } from '@zimtsui/injektor';
import { TYPES } from '../../../injection/types';


export class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    private Cost = new CostFactory<H>(this.context.DataTypes.hFactory);

    private $position: Position<H>;
    private $cost: Cost<H>;

    public constructor(
        @inject(TYPES.vmctx)
        protected context: VirtualMachineContextLike<H>,
        @inject(TYPES.marketSpec)
        protected marketSpec: MarketSpecLike<H>,
        @inject(TYPES.MODELS.initialBalance)
        protected balance: H,
    ) {
        this.$position = this.context.DataTypes.positionFactory.new({
            [Length.LONG]: this.context.DataTypes.hFactory.from(0),
            [Length.SHORT]: this.context.DataTypes.hFactory.from(0),
        });
        this.$cost = {
            [Length.LONG]: this.context.DataTypes.hFactory.from(0),
            [Length.SHORT]: this.context.DataTypes.hFactory.from(0)
        };
    }

    public getBalance(): H {
        return this.balance;
    }

    public getPosition(): Position<H> {
        return this.context.DataTypes.positionFactory.new(this.$position);
    }

    public getCost(): Cost<H> {
        return this.Cost.copy(this.$cost);
    }

    public capture(): Assets.Snapshot {
        return {
            position: this.context.DataTypes.positionFactory.capture(this.$position),
            cost: this.Cost.capture(this.$cost),
            balance: this.context.DataTypes.hFactory.capture(this.balance),
        };
    }

    public restore(snapshot: Assets.Snapshot): void {
        this.balance = this.context.DataTypes.hFactory.restore(snapshot.balance);
        this.$position = this.context.DataTypes.positionFactory.restore(snapshot.position);
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
                .div(this.$position[length], this.marketSpec.CURRENCY_SCALE)
            : this.context.DataTypes.hFactory.from(0);
        const profit = dollarVolume.minus(cost)
            .times(length === Length.LONG ? 1 : -1);
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
        );
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
}
