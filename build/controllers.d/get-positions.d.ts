import { Models } from '../models';
import { Context } from '../context';
import { Positions } from '../interfaces';
import { ModelLike } from '../models.d/model';
import { GetClosable } from './get-closable';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets'>;
export declare namespace GetPositions {
    type Involved = OwnInvolved & GetClosable.Involved;
}
export declare class GetPositions implements ControllerLike {
    private context;
    private models;
    private getClosable;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved, getClosable: GetClosable);
    getPositions(): Positions;
}
export {};
