import { Length, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Model } from './model';
interface Snapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export declare class Assets extends Model<Snapshot, Backup> {
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
    restore(snapshot: Backup): void;
    payFee(fee: Big): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big): void;
    /**
     * @returns Profit.
     */
    closePosition(length: Length, volume: Big, dollarVolume: Big): Big;
}
export {};
