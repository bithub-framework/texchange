import { Length, HLike } from 'interfaces';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { TasksLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';
export declare class DefaultSettle<H extends HLike<H>> extends Settle<H> {
    protected readonly context: Context<H>;
    protected readonly models: StatefulModels<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: TasksLike<H>;
    constructor(context: Context<H>, models: StatefulModels<H>, broadcast: Broadcast<H>, tasks: TasksLike<H>);
    protected clearingMargin(length: Length, profit: H): H;
    protected assertEnoughBalance(): void;
}
