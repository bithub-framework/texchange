import { Task } from '../../task';
import { MarginAccumulationLike } from '../../tasks/tasks-like';
import { HLike } from 'interfaces';
export declare abstract class MarginAccumulation<H extends HLike<H>> extends Task<H> implements MarginAccumulationLike<H> {
    abstract newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
    abstract newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}
export declare namespace MarginAccumulation {
    type Volumes<H extends HLike<H>> = MarginAccumulationLike.Volumes<H>;
}
