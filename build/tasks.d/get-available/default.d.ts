import { HLike } from 'interfaces';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { GetAvailable } from './get-available';
import { Margins } from '../../models.d/margins';
import { Makers } from '../../models.d/makers';
export declare class DefaultGetAvailable<H extends HLike<H>> extends GetAvailable<H> {
    protected readonly context: Context<H>;
    protected readonly models: DefaultGetAvailable.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: DefaultGetAvailable.TaskDeps<H>;
    constructor(context: Context<H>, models: DefaultGetAvailable.ModelDeps<H>, broadcast: Broadcast<H>, tasks: DefaultGetAvailable.TaskDeps<H>);
    protected finalMargin(): H;
    protected finalFrozenBalance(): H;
}
export declare namespace DefaultGetAvailable {
    interface ModelDeps<H extends HLike<H>> extends GetAvailable.ModelDeps<H> {
        margins: Margins<H>;
        makers: Makers<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends GetAvailable.TaskDeps<H> {
    }
}
