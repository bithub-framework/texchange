import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { Balances } from '../interfaces';
declare type OwnInvolved = Pick<Models, never>;
export declare class GetBalances {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    getBalances(): Balances;
}
export {};
