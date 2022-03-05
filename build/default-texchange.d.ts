import { Texchange } from './texchange';
import { StatefulStartable } from 'startable';
import { Context } from './context';
import { Config } from './context.d/config';
import { Timeline } from 'interfaces';
import { Mtm } from './mark-to-market';
import { Models } from './models';
import { Assets } from './models.d/assets';
import { Margin } from './models.d/margin';
import { Makers } from './models.d/makers';
import { Book } from './models.d/book';
import { Progress } from './models.d/progress';
import { DefaultPricing } from './models.d/pricing.d/default';
import { Broadcast } from './broadcast';
import { TasksLike } from './tasks-like';
import { UseCases } from './use-cases';
import { Views } from './views';
export declare class DefaultTexchange extends Texchange<Snapshot> {
    protected readonly context: Context;
    protected readonly mtm: Mtm | null;
    protected readonly models: Models;
    protected readonly broadcast: Broadcast;
    protected readonly tasks: TasksLike;
    protected readonly useCases: UseCases;
    protected readonly views: Views;
    protected readonly startable: StatefulStartable<Snapshot>;
    constructor(config: Config, timeline: Timeline);
    private capture;
    private restore;
    private start;
    private stop;
}
export declare namespace DefaultTexchange {
    interface Snapshot {
        assets: Assets.Snapshot;
        margin: Margin.Snapshot;
        makers: Makers.Snapshot;
        book: Book.Snapshot;
        pricing: DefaultPricing.Snapshot;
        progress: Progress.Snapshot;
    }
}
import Snapshot = DefaultTexchange.Snapshot;
