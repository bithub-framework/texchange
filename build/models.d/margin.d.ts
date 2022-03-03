import { Length, TypeRecur } from '../interfaces';
import { Model } from './model';
import Big from 'big.js';
import { Context } from '../context';
import { Assets } from './assets';
interface Snapshot {
    [length: number]: Big;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Margin extends Model<Snapshot, Backup> {
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
export {};
