import { Context } from './context';
import { UseCases } from './use-cases';
import { Instant } from './views/instant';
import { Latency } from './views/latency';
import { Joystick } from './views/joystick';
export declare class Views {
    protected readonly context: Context;
    protected readonly useCases: UseCases;
    readonly instant: Instant;
    readonly latency: Latency;
    readonly joystick: Joystick;
    constructor(context: Context, useCases: UseCases);
}
