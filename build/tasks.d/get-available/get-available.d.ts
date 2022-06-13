import { GetAvailableLike } from './get-available-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { HLike } from 'secretary-like';
import { Assets } from '../../models.d/assets';
export declare abstract class GetAvailable<H extends HLike<H>> implements GetAvailableLike<H> {
    protected tasks: GetAvailable.TaskDeps<H>;
    protected abstract context: Context<H>;
    protected abstract models: GetAvailable.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;
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
