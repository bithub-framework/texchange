import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { MarginAccumulationLike } from './margin-accumulation-like';
import { HLike } from 'secretary-like';
export declare abstract class MarginAccumulation<H extends HLike<H>> implements MarginAccumulationLike<H> {
    protected tasks: MarginAccumulation.TaskDeps<H>;
    protected abstract context: Context<H>;
    protected abstract models: MarginAccumulation.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;
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
