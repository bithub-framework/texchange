import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike, Length } from 'secretary-like';
export declare abstract class TaskMarginAccumulation<H extends HLike<H>> {
    protected tasks: TaskMarginAccumulation.TaskDeps<H>;
    protected abstract context: Context<H>;
    protected abstract models: TaskMarginAccumulation.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;
    abstract newMarginAfterOpening(volumes: TaskMarginAccumulation.Volumes<H>): H;
    abstract newMarginAfterClosing(volumes: TaskMarginAccumulation.Volumes<H>): H;
}
export declare namespace TaskMarginAccumulation {
    interface Volumes<H extends HLike<H>> {
        length: Length;
        volume: H;
        dollarVolume: H;
    }
    interface ModelDeps<H extends HLike<H>> {
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
