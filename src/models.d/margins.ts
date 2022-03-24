import {
	Length,
	H, HLike, HStatic,
} from 'interfaces';
import { Context } from '../context/context';
import { StatefulLike } from 'startable';


export class Margins<H extends HLike<H>>
	implements StatefulLike<Margins.Snapshot> {

	private margin: Margins.Margin.MutablePlain<H>;

	private Margin = new Margins.MarginStatic<H>(this.context.H);

	public constructor(
		private readonly context: Context<H>,
	) {
		this.margin = {
			[Length.LONG]: this.context.H.from(0),
			[Length.SHORT]: this.context.H.from(0),
		};
	}

	public getMargin(): Margins.Margin<H> {
		return this.margin;
	}

	public setMargin(length: Length, margin: H): void {
		this.margin[length] = margin;
	}

	public capture(): Margins.Snapshot {
		return this.Margin.capture(this.margin);
	}

	public restore(snapshot: Margins.Snapshot): void {
		this.margin = this.Margin.restore(snapshot);
	}
}


export namespace Margins {
	export interface Margin<H extends HLike<H>> {
		readonly [length: Length]: H;
	}

	export namespace Margin {
		export interface MutablePlain<H extends HLike<H>> {
			[length: Length]: H;
		}

		export interface Snapshot {
			readonly [length: Length]: H.Snapshot;
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

		public restore(snapshot: Margin.Snapshot): Margin.MutablePlain<H> {
			return {
				[Length.LONG]: this.H.restore(snapshot[Length.LONG]),
				[Length.SHORT]: this.H.restore(snapshot[Length.SHORT]),
			};
		}
	}

	export type Snapshot = Margin.Snapshot;
}
