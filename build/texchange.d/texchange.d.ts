import { StatefulStartable } from 'startable';
import { Context } from '../context';
import { Mtm } from '../mark-to-market';
import { Models } from '../models';
import { Broadcast } from '../broadcast';
import { TasksLike } from '../tasks-like';
import { UseCases } from '../use-cases';
import { Views } from '../views';
export declare abstract class Texchange<Snapshot> {
    protected readonly abstract context: Context;
    protected readonly abstract mtm: Mtm | null;
    protected readonly abstract models: Models;
    protected readonly abstract broadcast: Broadcast;
    protected readonly abstract tasks: TasksLike;
    protected readonly abstract useCases: UseCases;
    protected readonly abstract views: Views;
    protected readonly abstract startable: StatefulStartable<Snapshot>;
}
