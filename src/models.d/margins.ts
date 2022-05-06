import {
	Length,
	H, HLike, HStatic,
} from 'secretary-like';
import { Context } from '../context';
import { StatefulLike } from '../stateful-like';


export class Margins<H extends HLike<H>>
	implements StatefulLike<Margins.Snapshot> {
	private Margin = new Margins.MarginStatic<H>(this.context.Data.H);

	private $margin: Margins.Margin<H>;

	public constructor(
		private context: Context<H>,
	) {
		this.$margin = {
			[Length.LONG]: new this.context.Data.H(0),
			[Length.SHORT]: new this.context.Data.H(0),
		};
	}

	public getMargin(): Margins.Margin<H> {
		return this.Margin.copy(this.$margin);
	}

	public setMargin(length: Length, marginNumber: H): void {
		this.$margin[length] = marginNumber;
	}

	public capture(): Margins.Snapshot {
		return this.Margin.capture(this.$margin);
	}

	public restore(snapshot: Margins.Snapshot): void {
		this.$margin = this.Margin.restore(snapshot);
	}
}


export namespace Margins {
	export interface Margin<H extends HLike<H>> {
		[length: Length]: H;
	}

	export namespace Margin {
		export interface Snapshot {
			[length: Length]: H.Snapshot;
		}
	}

	export class MarginStatic<H extends HLike<H>>{
		public constructor(
			private H: HStatic<H>,
		) { }

		public capture(margin: Margin<H>): Margin.Snapshot {
			return {
				[Length.LONG]: this.H.capture(margin[Length.LONG]),
				[Length.SHORT]: this.H.capture(margin[Length.SHORT]),
			};
		}

		public restore(snapshot: Margin.Snapshot): Margin<H> {
			return {
				[Length.LONG]: this.H.restore(snapshot[Length.LONG]),
				[Length.SHORT]: this.H.restore(snapshot[Length.SHORT]),
			};
		}

		public copy(margin: Margin<H>): Margin<H> {
			return {
				[Length.LONG]: margin[Length.LONG],
				[Length.SHORT]: margin[Length.SHORT],
			};
		}
	}

	export type Snapshot = Margin.Snapshot;
}
