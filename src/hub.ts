import { StatefulLike } from 'startable';
import {
    Config,
    Timeline,
    TypeRecur,
} from './interfaces';
import { EventEmitter } from 'events';
import { Calculation } from './context/calculation';
import { Assets } from './models/assets';
import { Margin } from './models/margin';
import { Makers } from './models/makers';
import { Book } from './models/book';
import { Mtm, DefaultMtm } from './models/mtm';
import { Progress } from './models/progress';
import { Clearing } from './presenters/clearing';
import { Taking } from './presenters/taking';
import { Taken } from './presenters/taken';
import { Making } from './presenters/making';
import { Validation } from './presenters/validation';
import { AccountView } from './presenters/account-view';
import { Instant } from './views/instant';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
import Big from 'big.js';


export class Hub extends EventEmitter implements StatefulLike<Snapshot, Backup> {
    public models: {
        assets: Assets;
        margin: Margin;
        makers: Makers;
        book: Book;
        mtm: Mtm<any>;
        progress: Progress;
    };
    public presenters = {
        clearing: new Clearing(this),
        making: new Making(this),
        taking: new Taking(this),
        taken: new Taken(this),
        validation: new Validation(this),
        accountView: new AccountView(this),
    };
    public views = {
        instant: new Instant(this),
        latency: new Latency(this),
        joystick: new Joystick(this),
    };
    public context: {
        config: Config;
        timeline: Timeline;
        calculation: Calculation;
    };

    constructor(
        config: Config,
        timeline: Timeline,
    ) {
        super();
        this.context = {
            config,
            timeline,
            calculation: new Calculation(this),
        };
        this.models = {
            assets: new Assets(this),
            margin: new Margin(this),
            makers: new Makers(this),
            book: new Book(this),
            mtm: new DefaultMtm(this, config.initialMarkPrice),
            progress: new Progress(this),
        };
    }

    public capture(): Snapshot {
        return {
            assets: this.models.assets.capture(),
            margin: this.models.margin.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            mtm: this.models.mtm.capture(),
            progress: this.models.progress.capture(),
        }
    }

    public restore(backup: Backup): void {
        this.models.assets.restore(backup.assets);
        this.models.margin.restore(backup.margin);
        this.models.makers.restore(backup.makers);
        this.models.book.restore(backup.book);
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
