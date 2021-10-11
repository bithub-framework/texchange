import { OpenOrder, Trade } from '../interfaces';
import { Core } from '../core';
export declare class MethodsTaking {
    private core;
    constructor(core: Core);
    orderTakes(taker: OpenOrder): Trade[];
}
