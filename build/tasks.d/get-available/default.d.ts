import { HLike } from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Tasks } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
import { GetAvailable } from './get-available';
export declare class DefaultGetAvailable<H extends HLike<H>> extends GetAvailable<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    protected finalMargin(): H;
    protected finalFrozenBalance(): H;
}
