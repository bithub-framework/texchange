import { StatefulLike } from 'startable';
import { Timeline, TypeRecur } from './interfaces';
import { Context } from './context';
import { Models } from './models';
import { UseCases } from './use-cases';
import { Mtm } from './mark-to-market';
import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';
import Big from 'big.js';
declare type Views = {
    instant: Instant;
    latency: Latency;
    joystick: Joystick;
};
export declare abstract class Texchange implements StatefulLike<Snapshot, Backup> {
    protected abstract context: Context;
    protected abstract models: Models;
    protected abstract tasks: UseCases;
    protected abstract views: Views;
    protected abstract mtm: Mtm | null;
    constructor(timeline: Timeline);
    capture(): Snapshot;
    restore(backup: Backup): void;
}
declare type Snapshot = any;
declare type Backup = TypeRecur<Snapshot, Big, string>;
export {};
