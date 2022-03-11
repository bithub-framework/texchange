import { Length, ReadonlyRecur, JsonCompatible, Position } from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Model } from '../model';
export declare class Assets extends Model<Assets.Snapshot> {
    protected readonly context: Context;
    private position;
    private balance;
    private cost;
    constructor(context: Context);
    getBalance(): Big;
    getPosition(): Readonly<Position>;
    getCost(): Readonly<Assets.Cost>;
    capture(): Assets.Snapshot;
    restore(snapshot: Assets.Snapshot): void;
    payFee(fee: Big): void;
    open({ length, volume, dollarVolume, }: Assets.Volumes): void;
    /**
     * @returns Profit.
     */
    close({ length, volume, dollarVolume, }: Assets.Volumes): Big;
}
export declare namespace Assets {
    export interface Cost {
        [length: number]: Big;
    }
    export interface Volumes {
        readonly length: Length;
        readonly volume: Big;
        readonly dollarVolume: Big;
    }
    interface SnapshotStruct {
        position: Position;
        balance: Big;
        cost: Cost;
    }
    export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
    export {};
}
