import { OpenOrder } from '../interfaces';
import { type Hub } from '../hub';
export declare class Validation {
    protected hub: Hub;
    constructor(hub: Hub);
    validateOrder(order: Readonly<OpenOrder>): void;
    /**
     * Can be called only in consistent states
     */
    private validateQuantity;
    private validateFormat;
}
