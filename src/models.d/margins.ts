import {
	Length,
	H, HLike,
} from 'interfaces';
import { Context } from '../context';
import { StatefulLike } from 'startable';


export class Margins<H extends HLike<H>>
	implements StatefulLike<Margins.Snapshot> {

	protected margin: Margins.Margin.MutablePlain<H>;

	public constructor(
		protected readonly context: Context<H>,
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
		return {
			[Length.LONG]: this.context.H.capture(
				this.margin[Length.LONG],
			),
			[Length.SHORT]: this.context.H.capture(
				this.margin[Length.SHORT],
			),
		};
	}

	public restore(snapshot: Margins.Snapshot): void {
		this.margin = {
			[Length.LONG]: this.context.H.restore(snapshot[Length.LONG]),
			[Length.SHORT]: this.context.H.restore(snapshot[Length.SHORT]),
		};
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

	export type Snapshot = Margin.Snapshot;
}
