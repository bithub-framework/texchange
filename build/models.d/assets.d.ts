import { Length, Position, HLike, H, HStatic } from 'secretary-like';
import { Context } from '../context';
import { StatefulLike } from '../stateful-like';
export declare class Assets<H extends HLike<H>> implements StatefulLike<Assets.Snapshot> {
    private context;
    private balance;
    private Cost;
    private $position;
    private $cost;
    constructor(context: Context<H>, balance: H);
    getBalance(): H;
    getPosition(): Position<H>;
    getCost(): Assets.Cost<H>;
    capture(): Assets.Snapshot;
    restore(snapshot: Assets.Snapshot): void;
    pay(fee: H): void;
    open(length: Length, volume: H, dollarVolume: H): void;
    /**
     * @returns Profit.
     */
    close(length: Length, volume: H, dollarVolume: H): H;
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
