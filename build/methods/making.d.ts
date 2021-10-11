import { OpenOrder } from '../interfaces';
import { Core } from '../core';
export declare class MethodsMaking {
    private core;
    constructor(core: Core);
    orderMakes(openOrder: OpenOrder): void;
}
