import { HLike } from 'secretary-like';
import { Latency } from '../facades.d/latency/latency';
import { Joystick } from '../facades.d/joystick';
export declare class Texchange<H extends HLike<H>> {
    user: UserTex<H>;
    admin: AdminTex<H>;
    constructor(user: UserTex<H>, admin: AdminTex<H>);
}
export interface AdminTex<H extends HLike<H>> extends Joystick<H> {
}
export interface UserTex<H extends HLike<H>> extends Latency<H> {
}
