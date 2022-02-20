import { Closable } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
import { ControllerLike } from './controller';
declare type OwnInvolved = Pick<Models, 'assets' | 'makers'>;
export declare namespace GetClosable {
    type Involved = OwnInvolved;
}
export declare class GetClosable implements ControllerLike {
    protected context: Context;
    protected models: OwnInvolved;
    involved: ModelLike[];
    constructor(context: Context, models: OwnInvolved);
    getClosable(): Closable;
}
export {};
