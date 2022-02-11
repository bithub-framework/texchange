import { StatefulLike } from 'startable';
import { Hub } from './hub';
import { Config, Timeline } from './interfaces';
export declare namespace Texchange {
    type Snapshot = Hub.Snapshot;
    type Backup = Hub.Backup;
}
export import Snapshot = Texchange.Snapshot;
export import Backup = Texchange.Backup;
export declare class Texchange implements StatefulLike<Snapshot, Backup> {
    protected hub: Hub;
    constructor(config: Config, timeline: Timeline);
    capture(): Snapshot;
    restore(backup: Backup): void;
}
