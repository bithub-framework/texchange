import Big from 'big.js';
import { Task } from '../../task';
import { MarginAccumulationLike } from '../../tasks/tasks-like';


export abstract class MarginAccumulation extends Task
	implements MarginAccumulationLike {

	public abstract newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes): Big;
	public abstract newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes): Big;
}

export namespace MarginAccumulation {
	export type Volumes = MarginAccumulationLike.Volumes;
}
