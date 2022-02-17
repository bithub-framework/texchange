import { Trade } from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Clearing } from './clearing';
export declare namespace Mtm {
    type Involved = Pick<Models, never>;
}
import Involved = Mtm.Involved;
export declare abstract class Mtm extends Startable {
    protected context: Context;
    protected models: Involved;
    protected clearing: Clearing;
    abstract involved: Involved[];
    constructor(context: Context, models: Involved, clearing: Clearing);
}
export declare namespace DefaultMtm {
    type Involved = Pick<Models, never> & Mtm.Involved;
}
import DefaultInvolved = DefaultMtm.Involved;
export declare class DefaultMtm extends Mtm {
    protected context: Context;
    protected models: DefaultInvolved;
    protected clearing: Clearing;
    involved: DefaultInvolved[];
    private markPrice;
    constructor(context: Context, models: DefaultInvolved, clearing: Clearing);
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    protected Startable$rawStart(): Promise<void>;
    protected Startable$rawStop(): Promise<void>;
}
