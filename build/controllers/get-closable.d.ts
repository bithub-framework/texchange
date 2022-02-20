import { Closable } from '../interfaces';
import { Context } from '../context';
import { Models } from '../models';
import { ModelLike } from '../models.d/model';
export declare namespace GetClosable {
    type Involved = Pick<Models, 'assets' | 'makers'>;
}
import Involved = GetClosable.Involved;
export declare class GetClosable {
    protected context: Context;
    protected models: Involved;
    involved: ModelLike[];
    constructor(context: Context, models: Involved);
    getClosable(): Closable;
}
