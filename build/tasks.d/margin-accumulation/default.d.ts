import Big from 'big.js';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { MarginAccumulation } from './margin-accumulation';
export declare class DefaultMarginAccumulation extends MarginAccumulation {
    protected readonly context: Context;
    protected readonly models: StatefulModels;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    constructor(context: Context, models: StatefulModels, broadcast: Broadcast, tasks: TasksLike);
    newMarginAfterOpening({ length, volume, dollarVolume, }: MarginAccumulation.Volumes): Big;
    newMarginAfterClosing({ length, volume, dollarVolume, }: MarginAccumulation.Volumes): Big;
}
