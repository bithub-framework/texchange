import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { Balances } from '../interfaces';
export declare class GetBalances {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    getBalances(): Balances;
}
