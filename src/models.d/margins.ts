import {
	Length,
	JsonCompatible,
	ReadonlyRecur,
} from 'interfaces';
import { Model } from '../model';
import { Context } from '../context';
import Big from 'big.js';



export class Margins extends Model<Margins.Snapshot> {
	protected margin: Margins.Margin;

	constructor(
		protected readonly context: Context,
	) {
		super();

		this.margin = {
			[Length.LONG]: new Big(0),
			[Length.SHORT]: new Big(0),
		};
	}

	public getMargin(): Readonly<Margins.Margin> {
		return this.margin;
	}

	public setMargin(length: Length, margin: Big): void {
		this.margin[length] = margin;
	}

	public capture(): Margins.Snapshot {
		return {
			[Length.LONG]: this.margin[Length.LONG].toString(),
			[Length.SHORT]: this.margin[Length.SHORT].toString(),
		};
	}

	public restore(snapshot: Margins.Snapshot): void {
		this.margin = {
			[Length.LONG]: new Big(snapshot[Length.LONG]),
			[Length.SHORT]: new Big(snapshot[Length.SHORT]),
		};
	}
}


export namespace Margins {
	export interface Margin {
		[length: number]: Big;
	}

	type SnapshotStruct = Margin;
	export type Snapshot = ReadonlyRecur<JsonCompatible<SnapshotStruct>>;
}
