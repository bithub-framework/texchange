import { GetAvailableLike } from './get-available-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
import { Assets } from '../../models.d/assets';
export declare abstract class GetAvailable<H extends HLike<H>> implements GetAvailableLike<H> {
    protected context: Context<H>;
    protected models: GetAvailable.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: GetAvailable.TaskDeps<H>;
    constructor(context: Context<H>, models: GetAvailable.ModelDeps<H>, broadcast: Broadcast<H>);
    getAvailable(): H;
    protected abstract finalMargin(): H;
    protected abstract finalFrozenBalance(): H;
}
export declare namespace GetAvailable {
    interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
    const TaskDeps: {};
}
