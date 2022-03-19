import { Task } from '../../task';
import { MarginAccumulationLike } from '../../tasks/tasks';
import { HLike } from 'interfaces';


export abstract class MarginAccumulation<H extends HLike<H>>
	extends Task<H>
	implements MarginAccumulationLike<H> {

	public abstract newMarginAfterOpening(
		volumes: MarginAccumulationLike.Volumes<H>,
	): H;
	public abstract newMarginAfterClosing(
		volumes: MarginAccumulationLike.Volumes<H>,
	): H;
}

export namespace MarginAccumulation {
	export type Volumes<H extends HLike<H>>
		= MarginAccumulationLike.Volumes<H>;
}
