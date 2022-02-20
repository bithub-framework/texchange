import { Models } from '../models';
import { Context } from '../context';
import { Balances } from '../interfaces';
import { ModelLike } from '../models.d/model';
import { GetAvailable } from './get-available';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets'>;
export declare namespace GetBalances {
    type Involved = OwnInvolved & GetAvailable.Involved;
}
export declare class GetBalances implements ControllerLike {
    private context;
    private models;
    private getAvailable;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved, getAvailable: GetAvailable);
    getBalances(): Balances;
}
export {};
