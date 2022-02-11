import { Length, TypeRecur } from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { type Hub } from '../hub';
export declare namespace Margin {
    interface Snapshot {
        [length: number]: Big;
    }
    type Backup = TypeRecur<Snapshot, Big, string>;
}
export import Snapshot = Margin.Snapshot;
export import Backup = Margin.Backup;
export declare class Margin implements StatefulLike<Snapshot, Backup> {
    private core;
    [length: number]: Big;
    constructor(core: Hub);
    incMargin(length: Length, volume: Big, dollarVolume: Big): void;
    decMargin(length: Length, volume: Big, dollarVolume: Big): void;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
