import {
    Length,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { Models } from '../../models';
import { Task } from '../task';
import { TasksLike, SettleLike } from '../../tasks-like';
import { Broadcast } from '../../broadcast';


export abstract class Settle extends Task
    implements SettleLike {

    protected abstract readonly context: Context;
    protected abstract readonly models: Models;
    protected abstract readonly broadcast: Broadcast;
    protected abstract readonly tasks: TasksLike;

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

    protected abstract clearingMargin(
        length: Length, profit: Big,
    ): Big;

    protected abstract assertEnoughBalance(): void;
}
