import { Length, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { StatefulLike } from 'startable';
import { Context } from '../context/context';
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
export declare class Assets implements StatefulLike<Snapshot, Backup> {
    private context;
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
