import { Models } from '../models/models';
import { Context } from '../context';
import { Tasks } from '../tasks/tasks';
import { UseCase } from '../use-case';
import { DatabaseTrade } from '../models.d/progress';
import { Broadcast } from '../broadcast';
import { HLike } from 'interfaces';
export declare class UpdateTrades<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: Models<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: Tasks<H>;
    private readonly realTimeSettlement;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>, realTimeSettlement: boolean);
    updateTrades(trades: readonly DatabaseTrade<H>[]): void;
}
