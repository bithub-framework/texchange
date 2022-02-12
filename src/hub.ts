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


export class Hub extends EventEmitter implements StatefulLike<Snapshot, Backup> {
    public models = {
        assets: new Assets(this),
        margin: new Margin(this),
        makers: new Makers(this),
        orderbooks: new Book(this),
        mtm: <MtmLike<any>>new DefaultMtm(this),
        progress: new Progress(this),
    };
    public presenters = {
        clearing: new Clearing(this),
        making: new Making(this),
        taking: new Taking(this),
        taken: new Taken(this),
        updating: new Updating(this),
        validation: new Validation(this),
    };
    public views = {
        instant: new Instant(this),
        latency: new Latency(this),
        joystick: new Joystick(this),
    };
    public context: {
        config: Config;
        timeline: Timeline;
        calculation: CalculationLike;
    };

    constructor(
        config: Config,
        timeline: Timeline,
    ) {
        super();
        this.context = {
            config,
            timeline,
            calculation: new DefaultCalculation(this),
        };
    }

    public capture(): Snapshot {
        return {
            assets: this.models.assets.capture(),
            margin: this.models.margin.capture(),
            makers: this.models.makers.capture(),
            book: this.models.orderbooks.capture(),
            mtm: this.models.mtm.capture(),
            progress: this.models.progress.capture(),
        }
    }

    public restore(backup: Backup): void {
        this.models.assets.restore(backup.assets);
        this.models.margin.restore(backup.margin);
        this.models.makers.restore(backup.makers);
        this.models.orderbooks.restore(backup.book);
        this.models.mtm.restore(backup.mtm);
        this.models.progress.restore(backup.progress);
    }
}

interface Snapshot {
    assets: any;
    margin: any;
    makers: any;
    book: any;
    mtm: any;
    progress: any;
}

type Backup = TypeRecur<Snapshot, Big, string>;
