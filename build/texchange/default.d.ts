import { Texchange } from './texchange';
import { StatefulStartable } from 'startable';
import { Context } from '../context';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { Mtm } from '../mark-to-market';
import { StatefulModels } from '../models';
import { Broadcast } from '../broadcast';
import { TasksLike } from '../tasks';
import { UseCasesLike } from '../use-cases';
import { Views } from '../views';
export declare class DefaultTexchange extends Texchange {
    protected readonly context: Context;
    protected readonly mtm: Mtm | null;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    protected readonly useCases: UseCasesLike;
    protected readonly views: Views;
    protected readonly startable: StatefulStartable<Texchange.Snapshot>;
    constructor(config: Config, timeline: Timeline);
    private start;
    private stop;
}
