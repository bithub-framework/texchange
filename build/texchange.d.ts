import { StatefulLike } from 'startable';
import { Hub } from './hub';
import { Config, Timeline } from './interfaces';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
export declare class Texchange implements StatefulLike<Hub.Snapshot, Hub.Backup> {
    protected hub: Hub;
    user: Latency;
    admin: Joystick;
    constructor(config: Config, timeline: Timeline);
    capture(): Hub.Snapshot;
    restore(backup: Hub.Backup): void;
}
