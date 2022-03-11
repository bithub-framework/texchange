import { Length, JsonCompatible, ReadonlyRecur } from 'interfaces';
import { Model } from '../model';
import { Context } from '../context';
import Big from 'big.js';
export declare class Margins extends Model<Margins.Snapshot> {
    protected readonly context: Context;
    protected margin: Margins.Margin;
    constructor(context: Context);
    getMargin(): Readonly<Margins.Margin>;
    setMargin(length: Length, margin: Big): void;
    capture(): Margins.Snapshot;
    restore(snapshot: Margins.Snapshot): void;
}
export declare namespace Margins {
    export interface Margin {
        [length: number]: Big;
    }
    type SnapshotStruct = Margin;
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
    export {};
}
