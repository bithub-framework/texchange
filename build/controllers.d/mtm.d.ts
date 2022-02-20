import { Trade } from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Context } from '../context';
import { Models } from '../models';
import { Settle } from './settle';
export declare namespace Mtm {
    type Involved = Pick<Models, never>;
}
import Involved = Mtm.Involved;
export declare abstract class Mtm extends Startable {
    protected context: Context;
    protected models: Involved;
    protected clearing: Settle;
    abstract involved: Involved[];
    constructor(context: Context, models: Involved, clearing: Settle);
}
export declare namespace DefaultMtm {
    type Involved = Pick<Models, never> & Mtm.Involved;
}
import DefaultInvolved = DefaultMtm.Involved;
export declare class DefaultMtm extends Mtm {
    protected context: Context;
    protected models: DefaultInvolved;
    protected clearing: Settle;
    involved: DefaultInvolved[];
    private markPrice;
    constructor(context: Context, models: DefaultInvolved, clearing: Settle);
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    protected Startable$rawStart(): Promise<void>;
    protected Startable$rawStop(): Promise<void>;
}
