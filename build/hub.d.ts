/// <reference types="node" />
import { StatefulLike } from 'startable';
import { Config, Timeline, TypeRecur } from './interfaces';
import { EventEmitter } from 'events';
import { Assets } from './models/assets';
import { Margin } from './models/margin';
import { Makers } from './models/makers';
import { Book } from './models/book';
import { MtmLike } from './models/mtm';
import { Progress } from './models/progress';
import { Validation } from './presenters/validation';
import { Clearing } from './presenters/clearing';
import { Taking } from './presenters/taking';
import { Taken } from './presenters/taken';
import { Making } from './presenters/making';
import { Updating } from './presenters/updating';
import { CalculationLike } from './context/calculation';
import { Instant } from './views/instant';
import { Latency as Latency } from './views/latency';
import Big from 'big.js';
export declare class Models implements StatefulLike<Models.Snapshot, Models.Backup> {
    assets: Assets;
    margin: Margin;
    makers: Makers;
    orderbooks: Book;
    mtm: MtmLike<any, any>;
    progress: Progress;
    constructor(hub: Hub);
    capture(): Models.Snapshot;
    restore(backup: Models.Backup): void;
}
export declare namespace Models {
    interface Snapshot {
        assets: any;
        margin: any;
        makers: any;
        book: any;
        mtm: any;
        progress: any;
    }
    type Backup = TypeRecur<Snapshot, Big, string>;
}
export declare class Presenters {
    clearing: Clearing;
    making: Making;
    taking: Taking;
    taken: Taken;
    updating: Updating;
    validation: Validation;
    constructor(hub: Hub);
}
export declare class Views {
    instant: Instant;
    latency: Latency;
    constructor(hub: Hub);
}
export declare class Context {
    config: Config;
    timeline: Timeline;
    calculation: CalculationLike;
    constructor(hub: Hub, config: Config, timeline: Timeline);
}
export declare class Hub extends EventEmitter implements StatefulLike<Hub.Snapshot, Hub.Backup> {
    models: Models;
    presenters: Presenters;
    views: Views;
    context: Context;
    constructor(config: Config, timeline: Timeline);
    capture(): Hub.Snapshot;
    restore(backup: Hub.Backup): void;
}
export declare namespace Hub {
    interface Snapshot {
        models: Models.Snapshot;
    }
    type Backup = TypeRecur<Snapshot, Big, string>;
}
