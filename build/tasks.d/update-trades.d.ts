import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { DatabaseTrade } from '../interfaces';
declare type OwnInvolved = Pick<Models, 'progress' | 'pricing'>;
export declare class UpdateTrades {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
}
export {};
