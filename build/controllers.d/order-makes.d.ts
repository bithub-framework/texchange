import { OpenOrder } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'book' | 'makers'>;
export declare namespace OrderMakes {
    type Involved = OwnInvolved;
}
export declare class OrderMakes implements ControllerLike {
    private context;
    protected models: OwnInvolved;
    constructor(context: Context, models: OwnInvolved);
    involved: ModelLike[];
    orderMakes(openOrder: Readonly<OpenOrder>): void;
}
export {};
