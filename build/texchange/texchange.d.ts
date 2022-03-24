import { Context } from '../context/context';
import { HLike } from 'interfaces';
import { StatefulStartable } from 'startable';
import { Mtm } from '../mark-to-market/mtm';
import { Models } from '../models/models';
import { Broadcast } from '../broadcast';
import { Tasks } from '../tasks/tasks';
import { UseCases } from '../use-cases/use-cases';
import { Views } from '../views';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';
export declare abstract class Texchange<H extends HLike<H>> {
    protected abstract readonly context: Context<H>;
    protected readonly abstract mtm: Mtm<H> | null;
    protected readonly abstract models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly abstract tasks: Tasks<H>;
    protected readonly abstract useCases: UseCases<H>;
    protected readonly abstract views: Views<H>;
    readonly startable: StatefulStartable<Texchange.Snapshot>;
    abstract readonly latency: Latency<H>;
    abstract readonly joystick: Joystick<H>;
    constructor();
    private start;
    private stop;
}
export declare namespace Texchange {
    type Snapshot = Models.Snapshot;
}
