import { StatefulLike } from 'startable';
import {
    Config,
    Timeline,
    TypeRecur,
} from './interfaces';
import { EventEmitter } from 'events';
import { Assets } from './models/assets';
import { Margin } from './models/margin';
import { Makers } from './models/makers';
import { Book } from './models/book';
import { MtmLike, DefaultMtm } from './models/mtm';
import { Progress } from './models/progress';
import { Validation } from './presenters/validation';
import { Clearing } from './presenters/clearing';
import { Taking } from './presenters/taking';
import { Taken } from './presenters/taken';
import { Making } from './presenters/making';
import { Updating } from './presenters/updating';
import { DefaultCalculation, CalculationLike } from './context/calculation';
import { Instant } from './views/instant';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
import Big from 'big.js';


export class Models implements StatefulLike<Models.Snapshot, Models.Backup> {
    public assets: Assets;
    public margin: Margin;
    public makers: Makers;
    public orderbooks: Book;
    public mtm: MtmLike<any, any>;
    public progress: Progress;

    constructor(hub: Hub) {
        this.assets = new Assets(hub);
        this.margin = new Margin(hub);
        this.makers = new Makers(hub);
        this.orderbooks = new Book(hub);
        this.mtm = new DefaultMtm(hub);
        this.progress = new Progress(hub);
    }

    public capture(): Models.Snapshot {
        return {
            assets: this.assets.capture(),
            margin: this.margin.capture(),
            makers: this.makers.capture(),
            book: this.orderbooks.capture(),
            mtm: this.mtm.capture(),
            progress: this.progress.capture(),
        }
    }

    public restore(backup: Models.Backup): void {
        this.assets.restore(backup.assets);
        this.margin.restore(backup.margin);
        this.makers.restore(backup.makers);
        this.orderbooks.restore(backup.book);
        this.mtm.restore(backup.mtm);
        this.progress.restore(backup.progress);
    }
}

export namespace Models {
    export interface Snapshot {
        assets: any;
        margin: any;
        makers: any;
        book: any;
        mtm: any;
        progress: any;
    }

    export type Backup = TypeRecur<Snapshot, Big, string>;
}

export class Presenters {
    public clearing: Clearing;
    public making: Making;
    public taking: Taking;
    public taken: Taken;
    public updating: Updating;
    public validation: Validation;

    constructor(hub: Hub) {
        this.clearing = new Clearing(hub);
        this.making = new Making(hub);
        this.taking = new Taking(hub);
        this.taken = new Taken(hub);
        this.updating = new Updating(hub);
        this.validation = new Validation(hub);
    }
}

export class Views {
    public instant: Instant;
    public latency: Latency;
    public joystick: Joystick;

    constructor(hub: Hub) {
        this.instant = new Instant(hub);
        this.latency = new Latency(hub);
        this.joystick = new Joystick(hub);
    }
}

export class Context {
    public calculation: CalculationLike;

    constructor(
        hub: Hub,
        public config: Config,
        public timeline: Timeline,
    ) {
        this.calculation = new DefaultCalculation(hub);
    }
}

export class Hub extends EventEmitter implements StatefulLike<Hub.Snapshot, Hub.Backup> {
    public models = new Models(this);
    public presenters = new Presenters(this);
    public views = new Views(this)
    public context: Context;

    constructor(
        config: Config,
        timeline: Timeline,
    ) {
        super();
        this.context = new Context(this, config, timeline);
    }

    public capture(): Hub.Snapshot {
        return {
            models: this.models.capture(),
        }
    }

    public restore(backup: Hub.Backup): void {
        this.models.restore(backup.models);
    }
}

export namespace Hub {
    export interface Snapshot {
        models: Models.Snapshot;
    }

    export type Backup = TypeRecur<Snapshot, Big, string>;
}
