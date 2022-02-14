import {
    Trade,
    TypeRecur,
} from '../interfaces';
import Big from 'big.js';
import { Startable, ReadyState, StatefulLike } from 'startable';
import { Context } from '../context/context';
import { Models } from '../models/models';
import { Clearing } from './clearing';



export abstract class Mtm extends Startable {
    constructor(
        protected context: Context,
        protected models: Models,
        protected clearing: Clearing,
    ) { super(); }
}

export class DefaultMtm extends Mtm {
    private markPrice: Big;

    constructor(
        protected context: Context,
        protected models: Models,
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
