import { Length, Position, HLike, H, HStatic, MarketSpec } from 'secretary-like';
import { Context } from '../../context';
import { StatefulLike } from '../../stateful-like';
import { Executed } from '../../interfaces/executed';
export declare class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    protected context: Context<H>;
    protected marketSpec: MarketSpec<H>;
    protected balance: H;
    private Cost;
    private $position;
    private $cost;
    constructor(context: Context<H>, marketSpec: MarketSpec<H>, balance: H);
    getBalance(): H;
    getPosition(): Position<H>;
    getCost(): Assets.Cost<H>;
    capture(): Assets.Snapshot;
    restore(snapshot: Assets.Snapshot): void;
    pay(fee: H): void;
    open({ length, volume, dollarVolume, }: Executed<H>): void;
    /**
     *
     * @returns Profit
     */
    close({ length, volume, dollarVolume, }: Executed<H>): H;
    /**
     * @returns Profit
     */
    settle(length: Length, settlementPrice: H): H;
}
export declare namespace Assets {
    interface Snapshot {
        position: Position.Snapshot;
        balance: H.Snapshot;
        cost: Cost.Snapshot;
    }
    interface Cost<H extends HLike<H>> {
        [length: Length]: H;
    }
    namespace Cost {
        interface Snapshot {
            readonly [length: Length]: H.Snapshot;
        }
    }
    class CostStatic<H extends HLike<H>> {
        private H;
        constructor(H: HStatic<H>);
        capture(cost: Cost<H>): Cost.Snapshot;
        restore(snapshot: Cost.Snapshot): Cost<H>;
        copy(cost: Cost<H>): Cost<H>;
    }
}
