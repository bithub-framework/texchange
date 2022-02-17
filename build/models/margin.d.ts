import { Length, TypeRecur } from '../interfaces';
import { ModelLike } from './model';
import Big from 'big.js';
import { Context } from '../context/context';
import { Assets } from './assets';
interface Snapshot {
    [length: number]: Big;
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Margin implements ModelLike<Snapshot, Backup, boolean> {
    private context;
    [length: number]: Big;
    stage?: boolean;
    constructor(context: Context);
    initializeStage(): void;
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
