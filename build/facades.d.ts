import { Instant } from './facades.d/instant';
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';
import { HLike } from 'secretary-like';
import { Context } from './context';
import { Models } from './models';
import { Mtm } from './mark-to-market/mtm';
import { UseCases } from './use-cases';
export declare class Facades<H extends HLike<H>, PricingSnapshot> {
    instant: Instant<H>;
    latency: Latency<H>;
    joystick: Joystick<H, PricingSnapshot>;
    constructor(context: Context<H>, models: Models<H, PricingSnapshot>, mtm: Mtm<H> | null, useCases: UseCases<H>);
}
