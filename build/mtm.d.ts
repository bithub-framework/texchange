import { Startable } from 'startable';
import { Context } from './context';
import { Models } from './models';
import { Settle } from './controllers.d/settle';
import { ModelLike } from './models.d/model';
export declare namespace Mtm {
    type OwnInvolved = Pick<Models, never>;
    type Involved = OwnInvolved & Settle.Involved;
}
export declare abstract class Mtm extends Startable {
    protected context: Context;
    protected models: Mtm.OwnInvolved;
    protected settle: Settle;
    protected involved: ModelLike[];
    constructor(context: Context, models: Mtm.OwnInvolved, settle: Settle);
}
export declare namespace DefaultMtm {
    type OwnInvolved = Mtm.OwnInvolved & Pick<Models, never>;
    type Involved = OwnInvolved & Pick<Models, never> & Mtm.Involved;
}
export declare class DefaultMtm extends Mtm {
    protected context: Context;
    protected models: DefaultMtm.OwnInvolved;
    protected settle: Settle;
    protected involved: ModelLike[];
    constructor(context: Context, models: DefaultMtm.OwnInvolved, settle: Settle);
    protected Startable$rawStart(): Promise<void>;
    protected Startable$rawStop(): Promise<void>;
}
