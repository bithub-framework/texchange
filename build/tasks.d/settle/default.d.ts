import { Length, HLike } from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Tasks } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
import { Settle } from './settle';
export declare class DefaultSettle<H extends HLike<H>> extends Settle<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
    protected clearingMargin(length: Length, profit: H): H;
    protected assertEnoughBalance(): void;
}
