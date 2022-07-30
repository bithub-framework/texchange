import { HLike, H, HFactory, Length, CompositeDataLike, CompositeDataFactoryLike } from 'secretary-like';
export interface BalanceLike<H extends HLike<H>> extends Balance.Source<H>, CompositeDataLike {
    [length: Length]: H;
}
declare class Balance<H extends HLike<H>> implements BalanceLike<H> {
    private factory;
    [length: Length]: H;
    constructor(source: Balance.Source<H>, factory: BalanceFactory<H>);
    toJSON(): unknown;
    toString(): string;
}
export declare namespace Balance {
    interface Source<H extends HLike<H>> {
        [length: Length]: H;
    }
    interface Snapshot {
        readonly long: H.Snapshot;
        readonly short: H.Snapshot;
    }
}
export declare class BalanceFactory<H extends HLike<H>> implements CompositeDataFactoryLike<Balance.Source<H>, BalanceLike<H>, Balance.Snapshot> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    new(source: Balance.Source<H>): Balance<H>;
    capture(balance: BalanceLike<H>): Balance.Snapshot;
    restore(snapshot: Balance.Snapshot): Balance<H>;
}
export {};
