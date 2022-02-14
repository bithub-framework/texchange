import {
    Length,
} from '../interfaces';
import { type Hub } from '../hub';
import Big from 'big.js';
import { Context } from '../context/context';
import { Models } from '../models/models';
import assert = require('assert');



export class Clearing {
    constructor(
        protected context: Context,
        protected models: Models,
    ) { }

    public settle(): void {
        const { config } = this.context;
        const { assets, margin, pricing } = this.models;

        const position = {
            [Length.LONG]: assets.position[Length.LONG],
            [Length.SHORT]: assets.position[Length.SHORT],
        };
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = config.dollarVolume(
                settlementPrice, position[length],
            ).round(config.CURRENCY_DP);
            const profit = assets.closePosition(
                length, position[length], dollarVolume,
            );
            assets.openPosition(
                length, position[length], dollarVolume,
            );
            margin[length] = this.clearingMargin(length, profit);
        }
        this.assertEnoughBalance();
    }

    protected clearingMargin(
        length: Length, profit: Big,
    ): Big {
        // 默认逐仓
        return this.models.margin[length]
            .plus(profit);
    }

    protected assertEnoughBalance(): void {
        // 默认逐仓
        for (const length of [Length.SHORT, Length.LONG])
            assert(this.models.margin[length].gte(0));
    }
}
