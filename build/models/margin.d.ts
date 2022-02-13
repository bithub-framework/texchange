import { Length, TypeRecur } from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { type Hub } from '../hub';
interface Snapshot {
    [length: number]: Big;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Margin implements StatefulLike<Snapshot, Backup> {
    private hub;
    [length: number]: Big;
    constructor(hub: Hub);
    incMargin(length: Length, volume: Big, dollarVolume: Big): void;
    decMargin(length: Length, volume: Big, dollarVolume: Big): void;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
export {};
