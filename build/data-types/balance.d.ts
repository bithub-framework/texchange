import { HLike, H, HFactory, Length, CompositeDataLike, CompositeDataFactoryLike } from 'secretary-like';
export interface Balance<H extends HLike<H>> extends Balance.Source<H>, CompositeDataLike {
    [length: Length]: H;
}
declare class ConcreteBalance<H extends HLike<H>> implements Balance<H> {
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
export declare class BalanceFactory<H extends HLike<H>> implements CompositeDataFactoryLike<Balance.Source<H>, Balance<H>, Balance.Snapshot> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    new(source: Balance.Source<H>): ConcreteBalance<H>;
    capture(balance: Balance<H>): Balance.Snapshot;
    restore(snapshot: Balance.Snapshot): ConcreteBalance<H>;
}
export {};
