import { Length, Position, HLike, H, HStatic } from 'interfaces';
import { Context } from '../context/context';
import { StatefulLike } from 'startable';
export declare class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    private context;
    private $position;
    private balance;
    private $cost;
    private Position;
    private Cost;
    constructor(context: Context<H>);
    getBalance(): H;
    getPosition(): Position<H>;
    getCost(): Assets.Cost<H>;
    capture(): Assets.Snapshot;
    restore(snapshot: Assets.Snapshot): void;
    payFee(fee: H): void;
    open({ length, volume, dollarVolume, }: Assets.Volumes<H>): void;
    /**
     * @returns Profit.
     */
    close({ length, volume, dollarVolume, }: Assets.Volumes<H>): H;
}
export declare namespace Assets {
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
    interface Volumes<H extends HLike<H>> {
        readonly length: Length;
        readonly volume: H;
        readonly dollarVolume: H;
    }
    interface Snapshot {
        readonly position: Position.Snapshot;
        readonly balance: H.Snapshot;
        readonly cost: Cost.Snapshot;
    }
}
