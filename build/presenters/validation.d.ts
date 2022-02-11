import { OpenOrder } from '../interfaces';
import { type Hub } from '../hub';
export declare class Validation {
    protected hub: Hub;
    constructor(hub: Hub);
    validateOrder(order: OpenOrder): void;
    /**
     * Overridable
     * @param order Plain object.
     */
    protected assertEnough(order: OpenOrder): void;
    private validateFormat;
}
