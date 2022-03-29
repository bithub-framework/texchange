import { HLike } from 'interfaces';
import { StatefulLike } from '../stateful-like';
import { Startable } from 'startable';
import { Latency } from '../views.d/latency';
import { Joystick } from '../views.d/joystick';
export interface TexchangeLike<H extends HLike<H>> extends StatefulLike<Snapshot> {
    readonly startable: Startable;
    readonly user: Latency<H>;
    readonly admin: Joystick<H>;
}
export interface Snapshot {
    readonly assets: any;
    readonly margins: any;
    readonly makers: any;
    readonly book: any;
    readonly pricing: any;
    readonly progress: any;
}
