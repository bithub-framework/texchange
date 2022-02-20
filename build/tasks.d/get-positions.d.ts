import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { Positions } from '../interfaces';
declare type OwnInvolved = Pick<Models, 'assets'>;
export declare class GetPositions {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: OwnInvolved, controllers: Controllers);
    getPositions(): Positions;
}
export {};
