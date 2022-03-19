import { Length, HLike } from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Task } from '../../task';
import { Tasks, SettleLike } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';
export declare abstract class Settle<H extends HLike<H>> extends Task<H> implements SettleLike {
    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Models<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: Tasks<H>;
    settle(): void;
    protected abstract clearingMargin(length: Length, profit: H): H;
    protected abstract assertEnoughBalance(): void;
}
