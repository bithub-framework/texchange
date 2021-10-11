import { OpenOrder } from '../interfaces';
import { Core } from '../core';
export declare class MethodsValidation {
    private core;
    constructor(core: Core);
    validateOrder(order: OpenOrder): void;
    private assertEnoughPosition;
    private assertEnoughAvailable;
    private formatCorrect;
}
