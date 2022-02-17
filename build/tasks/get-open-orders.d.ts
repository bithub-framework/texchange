import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import { OpenOrder } from '../interfaces';
export declare class GetOpenOrders {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    getOpenOrders(): OpenOrder[];
}
