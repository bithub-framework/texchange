import { HLike, H, HFactory, Length } from 'secretary-like';
export declare class Balance<H extends HLike<H>> {
    [length: Length]: H;
}
export declare namespace Balance {
    interface Snapshot {
        readonly long: H.Snapshot;
        readonly short: H.Snapshot;
    }
}
export declare class BalanceFactory<H extends HLike<H>> {
    private hFactory;
    constructor(hFactory: HFactory<H>);
    capture(balance: Balance<H>): Balance.Snapshot;
    restore(snapshot: Balance.Snapshot): Balance<H>;
    copy(balance: Balance<H>): Balance<H>;
}