import { HLike } from 'interfaces';
import { Latency } from './facades.d/latency/latency';
import { Joystick } from './facades.d/joystick';
export declare class Texchange<H extends HLike<H>, PricingSnapshot> {
    user: UserTex<H>;
    admin: AdminTex<H, PricingSnapshot>;
    constructor(user: UserTex<H>, admin: AdminTex<H, PricingSnapshot>);
}
export interface AdminTex<H extends HLike<H>, PricingSnapshot> extends Joystick<H, PricingSnapshot> {
}
export interface UserTex<H extends HLike<H>> extends Latency<H> {
}
