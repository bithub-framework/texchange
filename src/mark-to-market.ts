import { Startable } from 'startable';
import { Context } from './context';
import { Models } from './models';
import { Tasks } from './tasks';


export abstract class Mtm {
    public abstract startable: Startable;
}


// 默认永不结算
export class DefaultMtm extends Mtm {
    public startable = new Startable(
        () => this.start(),
        () => this.stop(),
    );

    constructor(
        protected context: Context,
        protected models: Models,
        protected tasks: Tasks,
    ) { super(); }

    private async start(): Promise<void> { }
    private async stop(): Promise<void> { }
}
