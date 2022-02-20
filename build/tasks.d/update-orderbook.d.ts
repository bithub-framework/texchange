import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { Orderbook } from '../interfaces';
declare type OwnInvolved = Pick<Models, 'book'>;
export declare class UpdateOrderbook {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
export {};
