import { OpenOrder } from '../interfaces';
import { Core } from '../core';
export declare class MethodsOrdering {
    private core;
    constructor(core: Core);
    cancelOpenOrder(order: OpenOrder): OpenOrder;
    makeOpenOrder(order: OpenOrder): OpenOrder;
}
