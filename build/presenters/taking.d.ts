import { OpenOrder, Trade } from '../interfaces';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models'> {
}
export declare class Taking {
    private hub;
    constructor(hub: Deps);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
export {};
