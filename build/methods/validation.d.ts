import { OpenOrder } from '../interfaces';
import { Core } from '../core';
export declare class MethodsValidation {
    protected core: Core;
    constructor(core: Core);
    validateOrder(order: OpenOrder): void;
    /**
     * Overridable
     * @param order Plain object.
     */
    protected assertEnough(order: OpenOrder): void;
    private validateFormat;
}
