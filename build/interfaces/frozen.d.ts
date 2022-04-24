import { Length, HLike, H, HStatic } from 'interfaces';
export interface Frozen<H> {
    readonly balance: {
        readonly [length: Length]: H;
    };
    readonly position: {
        readonly [length: Length]: H;
    };
}
export declare namespace Frozen {
    interface Snapshot {
        readonly balance: {
            readonly [length: Length]: H.Snapshot;
        };
        readonly position: {
            readonly [length: Length]: H.Snapshot;
        };
    }
}
export declare class FrozenStatic<H extends HLike<H>> {
    private H;
    constructor(H: HStatic<H>);
    plus(x: Frozen<H>, y: Frozen<H>): Frozen<H>;
    ZERO: Frozen<H>;
    minus(x: Frozen<H>, y?: Frozen<H>): Frozen<H>;
    capture(frozen: Frozen<H>): Frozen.Snapshot;
    restore(snapshot: Frozen.Snapshot): Frozen<H>;
}
