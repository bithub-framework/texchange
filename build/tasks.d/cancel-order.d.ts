import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { OpenOrder } from '../interfaces';
declare type OwnInvolved = Pick<Models, never>;
export declare class CancelOrder {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
}
export {};
