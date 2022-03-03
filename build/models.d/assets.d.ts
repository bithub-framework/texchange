import { Length } from 'interfaces';
import Big from 'big.js';
import { Context } from '../context';
import { Model, Stringified } from './model';
export interface Snapshot {
    position: {
        [length: number]: Big;
    };
    balance: Big;
    cost: {
        [length: number]: Big;
    };
}
export declare type Backup = Stringified<Snapshot>;
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
    restore(snapshot: Backup): void;
    payFee(fee: Big): void;
    openPosition(length: Length, volume: Big, dollarVolume: Big): void;
    /**
     * @returns Profit.
     */
    closePosition(length: Length, volume: Big, dollarVolume: Big): Big;
}
