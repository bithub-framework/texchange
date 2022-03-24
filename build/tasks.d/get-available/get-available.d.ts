import { GetAvailableLike } from './get-available-like';
import { Context } from '../../context/context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
import { Assets } from '../../models.d/assets';
export declare abstract class GetAvailable<H extends HLike<H>> implements GetAvailableLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: GetAvailable.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: GetAvailable.TaskDeps<H>;
    constructor(context: Context<H>, models: GetAvailable.ModelDeps<H>, broadcast: Broadcast<H>, tasks: GetAvailable.TaskDeps<H>);
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
}
