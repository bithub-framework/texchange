import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { LimitOrder, OpenOrder } from '../interfaces';
declare type OwnInvolved = Pick<Models, 'progress'>;
export declare class MakeOrder {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    makeOrder(order: Readonly<LimitOrder>): OpenOrder;
}
export {};
