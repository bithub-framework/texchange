import { StatefulLike } from 'startable';
import { Context } from '../context';
import Big from 'big.js';
export declare abstract class Model<Snapshot = unknown> implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {
    protected abstract context: Context;
    abstract capture(): Snapshot;
    abstract restore(backup: Stringified<Snapshot>): void;
}
export declare type Stringified<T> = TypeRecur<T, Big, string>;
export declare type TypeRecur<Type, Old, New> = Type extends Old ? New : (Type extends {} ? {
    [K in keyof Type]: TypeRecur<Type[K], Old, New>;
} : Type);
