/// <reference types="node" />
import { StatefulLike } from 'startable';
import { Config, Timeline, TypeRecur } from './interfaces';
import { EventEmitter } from 'events';
import { Assets } from './models/assets';
import { Margin } from './models/margin';
import { Makers } from './models/makers';
import { Book } from './models/book';
import { Mtm } from './models/mtm';
import { Progress } from './models/progress';
import { Validation } from './presenters/validation';
import { Clearing } from './presenters/clearing';
import { Taking } from './presenters/taking';
import { Taken } from './presenters/taken';
import { Making } from './presenters/making';
import { Calculation } from './context/calculation';
import { Instant } from './views/instant';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
import Big from 'big.js';
export declare class Hub extends EventEmitter implements StatefulLike<Snapshot, Backup> {
    models: {
        assets: Assets;
        margin: Margin;
        makers: Makers;
        orderbooks: Book;
        mtm: Mtm<any>;
        progress: Progress;
    };
    presenters: {
        clearing: Clearing;
        making: Making;
        taking: Taking;
        taken: Taken;
        validation: Validation;
    };
    views: {
        instant: Instant;
        latency: Latency;
        joystick: Joystick;
    };
    context: {
        config: Config;
        timeline: Timeline;
        calculation: Calculation;
    };
    constructor(config: Config, timeline: Timeline);
    capture(): Snapshot;
    restore(backup: Backup): void;
}
interface Snapshot {
    assets: any;
    margin: any;
    makers: any;
    book: any;
    mtm: any;
    progress: any;
}
declare type Backup = TypeRecur<Snapshot, Big, string>;
export {};
