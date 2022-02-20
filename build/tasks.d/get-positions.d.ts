import { Models } from '../models';
import { Context } from '../context';
import { Controllers } from '../controllers';
import { Positions } from '../interfaces';
export declare class GetPositions {
    private context;
    private models;
    private controllers;
    private involved;
    constructor(context: Context, models: Models, controllers: Controllers);
    getPositions(): Positions;
}
