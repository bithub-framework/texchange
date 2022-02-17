import { Models } from '../models/models';
import { Context } from '../context/context';
import { Controllers } from '../controllers/controllers';
import { Amendment, OpenOrder } from '../interfaces';
export declare class AmendOrder {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    amendOrder(amendment: Readonly<Amendment>): OpenOrder;
}
