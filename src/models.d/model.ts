import { StatefulLike } from 'startable';
import { Context } from '../context';
import Big from 'big.js';


export abstract class Model<Snapshot = unknown>
	implements StatefulLike<Snapshot, TypeRecur<Snapshot, Big, string>> {

	protected abstract context: Context;

	public abstract capture(): Snapshot;
	public abstract restore(backup: Stringified<Snapshot>): void;
}

export type Stringified<T> = TypeRecur<T, Big, string>;

export type TypeRecur<Type, Old, New> =
	Type extends Old
	? New
	: (
		Type extends {}
		? { [K in keyof Type]: TypeRecur<Type[K], Old, New> }
		: Type
	);
