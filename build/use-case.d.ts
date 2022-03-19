import { Models } from './models/models';
import { Tasks } from './tasks/tasks';
import { Context } from './context';
import { HLike } from 'interfaces';
export declare abstract class UseCase<H extends HLike<H>> {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Models<H>;
    protected abstract readonly tasks: Tasks<H>;
}
