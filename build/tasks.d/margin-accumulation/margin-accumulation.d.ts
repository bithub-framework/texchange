import { Task } from '../../task';
import { MarginAccumulationLike } from './margin-accumulation-like';
import { HLike } from 'interfaces';
export declare abstract class MarginAccumulation<H extends HLike<H>> extends Task<H> implements MarginAccumulationLike<H> {
    protected abstract readonly models: MarginAccumulation.ModelDeps<H>;
    protected abstract readonly tasks: MarginAccumulation.TaskDeps<H>;
    abstract newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
    abstract newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}
export declare namespace MarginAccumulation {
    type Volumes<H extends HLike<H>> = MarginAccumulationLike.Volumes<H>;
    interface ModelDeps<H extends HLike<H>> extends Task.ModelDeps<H> {
    }
    interface TaskDeps<H extends HLike<H>> extends Task.TaskDeps<H> {
    }
}
