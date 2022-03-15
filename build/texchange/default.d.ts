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
import { HLike, HStatic } from 'interfaces';
export declare class DefaultTexchange<H extends HLike<H>> extends Texchange<H> {
    protected readonly context: Context<H>;
    protected readonly mtm: Mtm<H> | null;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    protected readonly useCases: UseCasesLike<H>;
    protected readonly views: Views<H>;
    protected readonly startable: StatefulStartable<Texchange.Snapshot>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
    private start;
    private stop;
}
export declare namespace DefaultTexchange {
    type Snapshot = Texchange.Snapshot;
}
