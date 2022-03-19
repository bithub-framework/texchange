import { Closable, HLike } from 'interfaces';
import { Context } from '../context';
import { Models } from '../models/models';
import { Task } from '../task';
import { Tasks, GetClosableLike } from '../tasks/tasks';
import { Broadcast } from '../broadcast';
export declare class GetClosable<H extends HLike<H>> extends Task<H> implements GetClosableLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    getClosable(): Closable<H>;
}
