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
import { Progress } from './models/progress';
import { Pricing, DefaultPricing } from './models/pricing';
import { Mtm, DefaultMtm } from './scheduler/mtm';
import { Calculation } from './scheduler/calculation';
import { Clearing } from './scheduler/clearing';
import { Taking } from './scheduler/taking';
import { Taken } from './scheduler/taken';
import { Making } from './scheduler/making';
import { Validation } from './scheduler/validation';
import { AccountView } from './scheduler/account-view';
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
        progress: Progress;
        pricing: Pricing<any>;
    };;
    public presenters: {
        mtm: Mtm<any>;
        clearing: Clearing;
        making: Making;
        taking: Taking;
        taken: Taken;
        validation: Validation;
        accountView: AccountView;
    };
    public views: {
        instant: Instant;
        latency: Latency;
        joystick: Joystick;
    } = {
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
            progress: new Progress(this),
            pricing: new DefaultPricing(this, config.initialSettlementPrice),
        };
        this.presenters = {
            mtm: new DefaultMtm(this),
            clearing: new Clearing(this),
            making: new Making(this),
            taking: new Taking(this),
            taken: new Taken(this),
            validation: new Validation(this),
            accountView: new AccountView(this),
        }
    }

    public capture(): Snapshot {
        return {
            assets: this.models.assets.capture(),
            margin: this.models.margin.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            // TODO settlement price seperated from mtm
            // mtm: this.models.mtm.capture(),
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
