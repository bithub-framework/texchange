import { Context } from '../context';
import { Models } from '../models/models';
import { Broadcast } from '../broadcast';
import { Tasks } from '../tasks/tasks';
import { UpdateTrades } from '../use-cases.d/update-trades';
import { UseCases } from './use-cases';
import { HLike } from 'interfaces';
/**
 * 默认实时结算
 */
export declare class DefaultUseCases<H extends HLike<H>> extends UseCases<H> {
    readonly updateTrades: UpdateTrades<H>;
    constructor(context: Context<H>, models: Models<H>, broadcast: Broadcast<H>, tasks: Tasks<H>);
}
