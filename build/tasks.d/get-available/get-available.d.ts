import { GetAvailableLike } from './get-available-like';
import { Context } from '../../context/context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'interfaces';
import { Assets } from '../../models.d/assets';
export declare abstract class GetAvailable<H extends HLike<H>> implements GetAvailableLike<H> {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: GetAvailable.ModelDeps<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: GetAvailable.TaskDeps<H>;
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
