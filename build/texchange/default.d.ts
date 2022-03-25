import { Texchange } from './texchange';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { HLike, HStatic } from 'interfaces';
import { Context } from '../context/context';
import { Mtm } from '../mark-to-market/mtm';
import { Models } from '../models/models';
import { Tasks } from '../tasks/tasks';
import { UseCases } from '../use-cases/use-cases';
import { Views } from '../views';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';
export declare class DefaultTexchange<H extends HLike<H>> extends Texchange<H> {
    protected context: Context<H>;
    protected mtm: Mtm<H> | null;
    protected models: Models<H>;
    protected tasks: Tasks<H>;
    protected useCases: UseCases<H>;
    protected views: Views<H>;
    joystick: Joystick<H>;
    latency: Latency<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
}
export declare namespace DefaultTexchange {
    type Snapshot = Texchange.Snapshot;
}
