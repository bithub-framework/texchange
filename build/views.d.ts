import { Context } from './context/context';
import { UseCases } from './use-cases/use-cases';
import { Instant } from './views.d/instant';
import { Latency } from './views.d/latency';
import { Joystick } from './views.d/joystick';
import { HLike } from 'interfaces';
export declare class Views<H extends HLike<H>> {
    readonly instant: Instant<H>;
    readonly latency: Latency<H>;
    readonly joystick: Joystick<H>;
    constructor(context: Context<H>, useCases: UseCases<H>);
}
