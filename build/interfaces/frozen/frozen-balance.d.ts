import { HLike, H, HStatic, Length } from 'secretary-like';
export declare class FrozenBalance<H extends HLike<H>> {
    private long;
    private short;
    constructor(long: H, short: H);
    get(length: Length): H;
    set(length: Length, balance: H): void;
}
export declare namespace FrozenBalance {
    interface Snapshot {
        readonly long: H.Snapshot;
        readonly short: H.Snapshot;
    }
}
export declare class FrozenBalanceStatic<H extends HLike<H>> {
    private H;
    constructor(H: HStatic<H>);
    capture(balance: FrozenBalance<H>): FrozenBalance.Snapshot;
    restore(snapshot: FrozenBalance.Snapshot): FrozenBalance<H>;
    copy(balance: FrozenBalance<H>): FrozenBalance<H>;
}
