import { Startable } from 'startable';
import { Context } from './context';
import { Models } from './models';
import { Tasks } from './tasks';
export declare abstract class Mtm {
    abstract startable: Startable;
}
export declare class DefaultMtm extends Mtm {
    protected context: Context;
    protected models: Models;
    protected tasks: Tasks;
    startable: Startable;
    constructor(context: Context, models: Models, tasks: Tasks);
    private start;
    private stop;
}
