import { HLike, H, HFactory, Length, CompositeDataLike, CompositeDataFactoryLike } from 'secretary-like';
export interface Balance<H extends HLike<H>> extends Balance.Source<H>, CompositeDataLike {
    [length: Length]: H;
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
    create(source: Balance.Source<H>): Balance<H>;
    capture(balance: Balance<H>): Balance.Snapshot;
    restore(snapshot: Balance.Snapshot): Balance<H>;
}
