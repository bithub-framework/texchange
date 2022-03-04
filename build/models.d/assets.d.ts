import { Length, ReadonlyRecur, JsonCompatible } from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Model } from './model';
export declare class Assets extends Model<Snapshot> {
    protected context: Context;
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
    constructor(context: Context);
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
    payFee(fee: Big): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big): void;
    /**
     * @returns Profit.
     */
    closePosition(length: Length, volume: Big, dollarVolume: Big): Big;
}
interface SnapshotStruct {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}
export declare namespace Assets {
    type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = Assets.Snapshot;
export {};
