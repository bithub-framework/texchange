import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { OpenOrder } from '../interfaces';
export declare class GetOpenOrders {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    getOpenOrders(): OpenOrder[];
}
