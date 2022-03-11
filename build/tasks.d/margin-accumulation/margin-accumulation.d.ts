import Big from 'big.js';
import { Task } from '../../task';
import { MarginAccumulationLike } from '../../tasks/tasks-like';
export declare abstract class MarginAccumulation extends Task implements MarginAccumulationLike {
    abstract newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes): Big;
    abstract newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes): Big;
}
export declare namespace MarginAccumulation {
    type Volumes = MarginAccumulationLike.Volumes;
}
