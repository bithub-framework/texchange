import {
    Trade,
    TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState, StatefulLike } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Clearing } from './clearing';
import { ModelLike } from '../models/model';



export namespace Mtm {
    export type Involved = Pick<Models, never>;
}
import Involved = Mtm.Involved;

export abstract class Mtm extends Startable {
    public abstract involved: Involved[];

    constructor(
        protected context: Context,
        protected models: Involved,
        protected clearing: Clearing,
    ) { super(); }
}


export namespace DefaultMtm {
    export type Involved = Pick<Models, never> & Mtm.Involved;
}
import DefaultInvolved = DefaultMtm.Involved;

export class DefaultMtm extends Mtm {
    public involved: DefaultInvolved[] = [];
    private markPrice: Big;

    constructor(
        protected context: Context,
        protected models: DefaultInvolved,
        protected clearing: Clearing,
    ) {
        super(context, models, clearing);
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
