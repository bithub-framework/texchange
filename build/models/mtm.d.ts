import { Trade, TypeRecur } from '../interfaces';
import Big from 'big.js';
import { StatefulLike } from 'startable';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context'> {
    presenters: Pick<Hub['presenters'], 'clearing'>;
}
export declare abstract class Mtm<Snapshot> implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {
    protected hub: Deps;
    protected markPrice: Big;
    constructor(hub: Deps, markPrice: Big);
    abstract getSettlementPrice(): Big;
    abstract updateTrades(trades: readonly Readonly<Trade>[]): void;
    abstract capture(): Snapshot;
    abstract restore(backup: TypeRecur<Snapshot, Big, string>): void;
}
export declare class DefaultMtm extends Mtm<Snapshot> {
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    capture(): Snapshot;
    restore(snapshot: Backup): void;
}
declare type Snapshot = Big;
declare type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;
export {};
