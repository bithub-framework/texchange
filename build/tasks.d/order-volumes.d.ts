import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderVolumesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
export declare class OrderVolumes extends Task implements OrderVolumesLike {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    open({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes): void;
    close({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes): void;
}
