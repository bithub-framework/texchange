import { HLike, HFactory, Position, PositionLike, PositionFactory } from 'secretary-like';
import { Balance, BalanceLike, BalanceFactory } from './balance';
export interface Frozen<H extends HLike<H>> {
    balance: BalanceLike<H>;
    position: PositionLike<H>;
}
export declare namespace Frozen {
    interface Snapshot {
        readonly balance: Balance.Snapshot;
        readonly position: Position.Snapshot;
    }
}
export declare class FrozenFactory<H extends HLike<H>> {
    private balanceFactory;
    private positionFactory;
    constructor(balanceFactory: BalanceFactory<H>, positionFactory: PositionFactory<H>);
    capture(frozen: Frozen<H>): Frozen.Snapshot;
    restore(snapshot: Frozen.Snapshot): Frozen<H>;
}
export declare class FrozenStatic<H extends HLike<H>> {
    private hFactory;
    private balanceFactory;
    private positionFactory;
    constructor(hFactory: HFactory<H>, balanceFactory: BalanceFactory<H>, positionFactory: PositionFactory<H>);
    plus(x: Frozen<H>, y: Frozen<H>): Frozen<H>;
    readonly ZERO: Frozen<H>;
    minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H>;
}
