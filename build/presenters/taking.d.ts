import { OpenOrder, Trade } from '../interfaces';
import { type Hub } from '../hub';
export declare class Taking {
    private hub;
    constructor(hub: Hub);
    /**
     * @param taker variable
     */
    orderTakes(taker: OpenOrder): Trade[];
}
