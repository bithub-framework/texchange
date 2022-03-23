import { Texchange } from './texchange';
import { Config } from '../context.d/config';
import { Timeline } from 'interfaces';
import { HLike, HStatic } from 'interfaces';
import { Context } from '../context';
import { Mtm } from '../mark-to-market';
import { Models } from '../models';
import { Tasks } from '../tasks';
import { UseCases } from '../use-cases';
import { Views } from '../views';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';
export declare class DefaultTexchange<H extends HLike<H>> extends Texchange<H> {
    protected readonly context: Context<H>;
    protected readonly mtm: Mtm<H> | null;
    protected readonly models: Models<H>;
    protected readonly tasks: Tasks<H>;
    protected readonly useCases: UseCases<H>;
    protected readonly views: Views<H>;
    joystick: Joystick<H>;
    latency: Latency<H>;
    constructor(config: Config<H>, timeline: Timeline, H: HStatic<H>);
}
export declare namespace DefaultTexchange {
    type Snapshot = Texchange.Snapshot;
}
