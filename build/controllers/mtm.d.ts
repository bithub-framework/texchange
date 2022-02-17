import { Trade } from '../interfaces';
import Big from 'big.js';
import { Startable } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Clearing } from './clearing';
import { type Stages } from '../scheduler';
export declare namespace Mtm {
    type Involved = keyof Pick<Models, never>;
}
import Involved = Mtm.Involved;
export declare abstract class Mtm extends Startable {
    protected context: Context;
    protected models: Pick<Models, Involved>;
    protected stages: Pick<Stages, Involved>;
    protected clearing: Clearing;
    static involved: Involved[];
    constructor(context: Context, models: Pick<Models, Involved>, stages: Pick<Stages, Involved>, clearing: Clearing);
}
export declare namespace DefaultMtm {
    type Involved = keyof Pick<Models, never> | Mtm.Involved;
}
import DefaultInvolved = DefaultMtm.Involved;
export declare class DefaultMtm extends Mtm {
    protected context: Context;
    protected models: Pick<Models, DefaultInvolved>;
    protected stages: Pick<Stages, DefaultInvolved>;
    protected clearing: Clearing;
    static involved: DefaultInvolved[];
    private markPrice;
    constructor(context: Context, models: Pick<Models, DefaultInvolved>, stages: Pick<Stages, DefaultInvolved>, clearing: Clearing);
    updateTrades(trades: readonly Readonly<Trade>[]): void;
    getSettlementPrice(): Big;
    protected Startable$rawStart(): Promise<void>;
    protected Startable$rawStop(): Promise<void>;
}
