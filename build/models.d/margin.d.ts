import { Length } from 'interfaces';
import { Model, Stringified } from './model';
import Big from 'big.js';
import { Context } from '../context';
import { Assets } from './assets';
export interface Snapshot {
    [length: number]: Big;
}
export declare type Backup = Stringified<Snapshot>;
export declare class Margin extends Model<Snapshot> {
    protected context: Context;
    [length: number]: Big;
    constructor(context: Context);
    incMargin(length: Length, volume: Big, dollarVolume: Big): void;
    decMargin(oldAssets: Assets, length: Length, volume: Big, dollarVolume: Big): void;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    protected marginIncrement(length: Length, volume: Big, dollarVolume: Big): Big;
    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    protected marginDecrement(oldAssets: Assets, length: Length, volume: Big, dollarVolume: Big): Big;
}
