import { Instant } from './facades.d/instant';
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';
import { HLike } from 'interfaces';
import { Context } from './context';
import { UseCases } from './use-cases';
export declare class Facades<H extends HLike<H>> {
    instant: Instant<H>;
    latency: Latency<H>;
    joystick: Joystick<H>;
    constructor(context: Context<H>, useCases: UseCases<H>);
}
