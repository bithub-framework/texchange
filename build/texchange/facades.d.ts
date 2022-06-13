import { Instant } from '../facades.d/instant';
import { Latency } from '../facades.d/latency/latency';
import { Joystick } from '../facades.d/joystick';
import { HLike } from 'secretary-like';
export declare class Facades<H extends HLike<H>> {
    instant: Instant<H>;
    latency: Latency<H>;
    joystick: Joystick<H>;
    constructor(instant: Instant<H>, latency: Latency<H>, joystick: Joystick<H>);
}
