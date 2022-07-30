import { HLike, HFactory, Position, PositionFactory, CompositeDataFactoryLike, CompositeDataLike } from 'secretary-like';
import { Balance, BalanceFactory } from './balance';
export interface Frozen<H extends HLike<H>> extends Frozen.Source<H>, CompositeDataLike {
    balance: Balance<H>;
    position: Position<H>;
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
export declare class FrozenFactory<H extends HLike<H>> implements CompositeDataFactoryLike<Frozen.Source<H>, Frozen<H>, Frozen.Snapshot> {
    private balanceFactory;
    private positionFactory;
    constructor(balanceFactory: BalanceFactory<H>, positionFactory: PositionFactory<H>);
    new(source: Frozen.Source<H>): Frozen<H>;
    capture(frozen: Frozen<H>): Frozen.Snapshot;
    restore(snapshot: Frozen.Snapshot): Frozen<H>;
}
export declare class FrozenStatic<H extends HLike<H>> {
    private frozenFactory;
    private hFactory;
    constructor(frozenFactory: FrozenFactory<H>, hFactory: HFactory<H>);
    plus(x: Frozen<H>, y: Frozen<H>): Frozen<H>;
    readonly ZERO: Frozen<H>;
    minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H>;
}
