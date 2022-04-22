import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { MarginAccumulationLike } from './margin-accumulation-like';
import { HLike } from 'interfaces';
export declare abstract class MarginAccumulation<H extends HLike<H>> implements MarginAccumulationLike<H> {
    protected context: Context<H>;
    protected models: MarginAccumulation.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    static TaskDeps: {};
    protected abstract tasks: MarginAccumulation.TaskDeps<H>;
    constructor(context: Context<H>, models: MarginAccumulation.ModelDeps<H>, broadcast: Broadcast<H>);
    abstract newMarginAfterOpening(volumes: MarginAccumulationLike.Volumes<H>): H;
    abstract newMarginAfterClosing(volumes: MarginAccumulationLike.Volumes<H>): H;
}
export declare namespace MarginAccumulation {
    type Volumes<H extends HLike<H>> = MarginAccumulationLike.Volumes<H>;
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
