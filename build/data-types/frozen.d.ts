import { HLike, HFactory, Position, PositionLike, PositionFactory, CompositeDataFactoryLike, CompositeDataLike } from 'secretary-like';
import { Balance, BalanceLike, BalanceFactory } from './balance';
export interface FrozenLike<H extends HLike<H>> extends Frozen.Source<H>, CompositeDataLike {
    balance: BalanceLike<H>;
    position: PositionLike<H>;
}
declare class Frozen<H extends HLike<H>> implements FrozenLike<H> {
    private factory;
    balance: BalanceLike<H>;
    position: PositionLike<H>;
    constructor(source: Frozen.Source<H>, factory: FrozenFactory<H>, balanceFactory: BalanceFactory<H>, positionFactory: PositionFactory<H>);
    toJSON(): unknown;
    toString(): string;
}
export declare namespace Frozen {
    interface Source<H extends HLike<H>> {
        balance: Balance.Source<H>;
        position: Position.Source<H>;
    }
    interface Snapshot {
        readonly balance: Balance.Snapshot;
        readonly position: Position.Snapshot;
    }
}
export declare class FrozenFactory<H extends HLike<H>> implements CompositeDataFactoryLike<Frozen.Source<H>, FrozenLike<H>, Frozen.Snapshot> {
    private balanceFactory;
    private positionFactory;
    constructor(balanceFactory: BalanceFactory<H>, positionFactory: PositionFactory<H>);
    new(source: Frozen.Source<H>): Frozen<H>;
    capture(frozen: FrozenLike<H>): Frozen.Snapshot;
    restore(snapshot: Frozen.Snapshot): Frozen<H>;
}
export declare class FrozenStatic<H extends HLike<H>> {
    private frozenFactory;
    private hFactory;
    constructor(frozenFactory: FrozenFactory<H>, hFactory: HFactory<H>);
    plus(x: FrozenLike<H>, y: FrozenLike<H>): FrozenLike<H>;
    readonly ZERO: FrozenLike<H>;
    minus(x: FrozenLike<H>, y?: FrozenLike<H>): FrozenLike<H>;
}
export {};
