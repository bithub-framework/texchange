import { Length, JsonCompatible, ReadonlyRecur } from 'interfaces';
import { Model } from '../../model';
import Big from 'big.js';
import { Assets } from '../assets';
export declare abstract class Margin extends Model<Snapshot> {
    [length: number]: Big;
    constructor();
    incMargin(length: Length, volume: Big, dollarVolume: Big): void;
    decMargin(oldAssets: Assets, length: Length, volume: Big, dollarVolume: Big): void;
    capture(): Snapshot;
    restore(snapshot: Snapshot): void;
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    protected abstract marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    protected abstract marginDecrement(oldAssets: Assets, length: Length, volume: Big, dollarVolume: Big): Big;
}
interface SnapshotStruct {
    [length: number]: Big;
}
export declare namespace Margin {
    type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
import Snapshot = Margin.Snapshot;
export {};
