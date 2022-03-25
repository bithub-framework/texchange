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
    protected abstract context: Context<H>;
    protected abstract mtm: Mtm<H> | null;
    protected abstract models: Models<H>;
    protected broadcast: Broadcast<H>;
    protected abstract tasks: Tasks<H>;
    protected abstract useCases: UseCases<H>;
    protected abstract views: Views<H>;
    startable: StatefulStartable<Texchange.Snapshot>;
    abstract latency: Latency<H>;
    abstract joystick: Joystick<H>;
    constructor();
    private start;
    private stop;
}
export declare namespace Texchange {
    type Snapshot = Models.Snapshot;
}
