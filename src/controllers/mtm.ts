import {
    Trade,
    TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState, StatefulLike } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Clearing } from './clearing';
import { type Stages } from '../scheduler';


export namespace Mtm {
    export type Involved = keyof Pick<Models, never>;
}
import Involved = Mtm.Involved;

export abstract class Mtm extends Startable {
    public static involved: Involved[] = [];

    constructor(
        protected context: Context,
        protected models: Pick<Models, Involved>,
        protected stages: Pick<Stages, Involved>,
        protected clearing: Clearing,
    ) { super(); }
}


export namespace DefaultMtm {
    export type Involved = keyof Pick<Models, never> | Mtm.Involved;
}
import DefaultInvolved = DefaultMtm.Involved;

export class DefaultMtm extends Mtm {
    public static involved: DefaultInvolved[] = [...Mtm.involved];
    private markPrice: Big;

    constructor(
        protected context: Context,
        protected models: Pick<Models, DefaultInvolved>,
        protected stages: Pick<Stages, DefaultInvolved>,
        protected clearing: Clearing,
    ) {
        super(context, models, stages, clearing);
        this.markPrice = context.config.initialSettlementPrice;
    }

    public updateTrades(trades: readonly Readonly<Trade>[]): void {
        this.markPrice = trades[trades.length - 1].price;
        this.clearing.settle();
    }

    public getSettlementPrice(): Big {
        return this.markPrice;
    }

    protected async Startable$rawStart(): Promise<void> { }
    protected async Startable$rawStop(): Promise<void> { }
}
