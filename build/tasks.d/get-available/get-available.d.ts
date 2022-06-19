import { HLike, MarketSpec } from 'secretary-like';
import { Assets } from '../../models.d/assets';
export declare abstract class TaskGetAvailable<H extends HLike<H>> {
    protected tasks: TaskGetAvailable.TaskDeps<H>;
    protected abstract marketSpec: MarketSpec<H>;
    protected abstract models: TaskGetAvailable.ModelDeps<H>;
    getAvailable(): H;
    protected abstract finalMargin(): H;
    protected abstract finalFrozenBalance(): H;
}
export declare namespace TaskGetAvailable {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
