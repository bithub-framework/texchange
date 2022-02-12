import { StatefulLike } from 'startable';
import { Hub } from './hub';
import { Config, Timeline, TypeRecur } from './interfaces';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
import Big from 'big.js';
export declare class Texchange implements StatefulLike<Snapshot, Backup> {
    protected hub: Hub;
    user: Latency;
    admin: Joystick;
    constructor(config: Config, timeline: Timeline);
    capture(): Snapshot;
    restore(backup: Backup): void;
}
declare type Snapshot = any;
declare type Backup = TypeRecur<Snapshot, Big, string>;
export {};
