import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'secretary-like';
import { Assets } from '../../models.d/assets';
export declare abstract class TaskGetAvailable<H extends HLike<H>> {
    protected tasks: TaskGetAvailable.TaskDeps<H>;
    protected abstract context: Context<H>;
    protected abstract models: TaskGetAvailable.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;
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
