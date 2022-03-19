import { Startable } from 'startable';
import { Context } from '../context';
import { Models } from '../models/models';
import { Tasks } from '../tasks/tasks';
import { HLike } from 'interfaces';


export abstract class Mtm<H extends HLike<H>> {
    public abstract readonly startable: Startable;
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Models<H>;
    protected abstract readonly tasks: Tasks<H>;
}
