import { OpenOrder } from '../interfaces';
import { type Hub } from '../hub';
export declare class Making {
    private core;
    constructor(core: Hub);
    orderMakes(openOrder: OpenOrder): void;
}
