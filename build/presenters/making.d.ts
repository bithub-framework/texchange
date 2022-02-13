import { OpenOrder } from '../interfaces';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
}
export declare class Making {
    private hub;
    constructor(hub: Deps);
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}
export {};
