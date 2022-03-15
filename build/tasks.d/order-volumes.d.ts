import { Context } from '../context';
import { StatefulModels } from '../models/stateful-models';
import { Task } from '../task';
import { TasksLike, OrderVolumesLike } from '../tasks/tasks-like';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
export declare class OrderVolumes<H extends HLike<H>> extends Task<H> implements OrderVolumesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    open({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
    close({ length, volume, dollarVolume, }: OrderVolumesLike.Volumes<H>): void;
}
