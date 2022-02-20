import { Context } from '../context';
import { Models } from '../models';
import { OpenOrder } from '../interfaces';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'makers'>;
export declare namespace CancelOpenOrder {
    type Involved = OwnInvolved;
}
export declare class CancelOpenOrder implements ControllerLike {
    private context;
    private models;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved);
    cancelOpenOrder(order: Readonly<OpenOrder>): OpenOrder;
}
export {};
