import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { OpenOrder } from '../interfaces';
export declare class CancelOrder {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    cancelOrder(order: Readonly<OpenOrder>): OpenOrder;
}
