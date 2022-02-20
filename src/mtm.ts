import { Startable } from 'startable';
import { Context } from './context';
import { Models } from './models';
import { Settle } from './controllers.d/settle';
import { ModelLike } from './models.d/model';



export namespace Mtm {
    export type OwnInvolved = Pick<Models, never>;
    export type Involved = OwnInvolved
        & Settle.Involved;
}

export abstract class Mtm extends Startable {
    protected involved: ModelLike[] = [
        ...this.settle.involved,
    ];

    constructor(
        protected context: Context,
        protected models: Mtm.OwnInvolved,
        protected settle: Settle,
    ) { super(); }
}


export namespace DefaultMtm {
    export type OwnInvolved = Mtm.OwnInvolved
        & Pick<Models, never>;
    export type Involved = OwnInvolved
        & Pick<Models, never>
        & Mtm.Involved;
}

export class DefaultMtm extends Mtm {
    protected involved: ModelLike[] = [
        ...super.involved,
    ];

    constructor(
        protected context: Context,
        protected models: DefaultMtm.OwnInvolved,
        protected settle: Settle,
    ) {
        super(context, models, settle);
    }

    protected async Startable$rawStart(): Promise<void> { }
    protected async Startable$rawStop(): Promise<void> { }
}
