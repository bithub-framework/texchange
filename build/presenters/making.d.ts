import { OpenOrder } from '../interfaces';
import { type Hub } from '../hub';
export declare class Making {
    private hub;
    constructor(hub: Hub);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}
