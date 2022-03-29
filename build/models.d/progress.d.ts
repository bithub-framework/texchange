import { Context } from '../context';
import { HLike } from 'interfaces';
import { StatefulLike } from '../stateful-like';
export declare class Progress<H extends HLike<H>> implements StatefulLike<Progress.Snapshot> {
    private context;
    userTradeCount: number;
    userOrderCount: number;
    constructor(context: Context<H>);
    capture(): Progress.Snapshot;
    restore(snapshot: Progress.Snapshot): void;
}
export declare namespace Progress {
    interface Snapshot {
        userTradeCount: number;
        userOrderCount: number;
    }
}
