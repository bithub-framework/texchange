import { OpenOrder } from '../interfaces';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
    presenters: Pick<Hub['presenters'], 'accountView'>;
}
export declare class Validation {
    protected hub: Deps;
    constructor(hub: Deps);
    validateOrder(order: Readonly<OpenOrder>): void;
    /**
     * Can be called only in consistent states
     */
    private validateQuantity;
    private validateFormat;
}
export {};
