import { HLike, HStatic, Position } from 'secretary-like';
import { FrozenBalance } from './frozen-balance';
export interface Frozen<H extends HLike<H>> {
    readonly balance: FrozenBalance<H>;
    readonly position: Position<H>;
}
export declare namespace Frozen {
    interface Snapshot {
        readonly balance: FrozenBalance.Snapshot;
        readonly position: Position.Snapshot;
    }
}
export declare class FrozenStatic<H extends HLike<H>> {
    private H;
    private Position;
    private FrozenBalance;
    constructor(H: HStatic<H>);
    plus(x: Frozen<H>, y: Frozen<H>): Frozen<H>;
    readonly ZERO: Frozen<H>;
    minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H>;
    capture(frozen: Frozen<H>): Frozen.Snapshot;
    restore(snapshot: Frozen.Snapshot): Frozen<H>;
}
