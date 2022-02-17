import { StatefulLike } from 'startable';
import { Timeline, TypeRecur } from './interfaces';
import { Context } from './context/context';
import { Models } from './models/models';
import { Scheduler } from './scheduler';
import { Instant } from './views/instant';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
import Big from 'big.js';
declare type Views = {
    instant: Instant;
    latency: Latency;
    joystick: Joystick;
};
export declare abstract class Texchange implements StatefulLike<Snapshot, Backup> {
    protected abstract context: Context;
    protected abstract models: Models;
    protected abstract scheduler: Scheduler;
    protected abstract views: Views;
    constructor(timeline: Timeline);
    capture(): Snapshot;
    restore(backup: Backup): void;
}
declare type Snapshot = any;
declare type Backup = TypeRecur<Snapshot, Big, string>;
export {};
