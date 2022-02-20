import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { Amendment, OpenOrder } from '../interfaces';
declare type OwnInvolved = Pick<Models, never>;
export declare class AmendOrder {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    amendOrder(amendment: Readonly<Amendment>): OpenOrder;
}
export {};
