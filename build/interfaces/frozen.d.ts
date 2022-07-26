import { HLike, HFactory, Position } from 'secretary-like';
import { Balance } from './balance';
export interface Frozen<H extends HLike<H>> {
    balance: Balance<H>;
    position: Position<H>;
}
export declare namespace Frozen {
    interface Snapshot {
        readonly balance: Balance.Snapshot;
        readonly position: Position.Snapshot;
    }
}
export declare class FrozenFactory<H extends HLike<H>> {
    private hFactory;
    private positionFactory;
    private balanceFactory;
    constructor(hFactory: HFactory<H>);
    capture(frozen: Frozen<H>): Frozen.Snapshot;
    restore(snapshot: Frozen.Snapshot): Frozen<H>;
}
export declare class FrozenStatic<H extends HLike<H>> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    plus(x: Frozen<H>, y: Frozen<H>): Frozen<H>;
    readonly ZERO: Frozen<H>;
    minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H>;
}
