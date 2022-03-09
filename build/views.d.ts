import { Context } from './context';
import { UseCasesLike } from './use-cases';
import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';
export declare class Views {
    readonly instant: Instant;
    readonly latency: Latency;
    readonly joystick: Joystick;
    constructor(context: Context, useCases: UseCasesLike);
}
