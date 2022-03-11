import {
    Length,
    Position,
} from 'interfaces';
import Big from 'big.js';
import { Context } from '../../context';
import { StatefulModels } from '../../models/stateful-models';
import { Task } from '../../task';
import { TasksLike, SettleLike } from '../../tasks/tasks-like';
import { Broadcast } from '../../broadcast';


export abstract class Settle extends Task
    implements SettleLike {

    protected abstract readonly context: Context;
    protected abstract readonly models: StatefulModels;
    protected abstract readonly broadcast: Broadcast;
    protected abstract readonly tasks: TasksLike;

    public settle(): void {
        const { config } = this.context;
        const { assets, margins: margin, pricing } = this.models;

        const position: Position = {
            [Length.LONG]: assets.getPosition()[Length.LONG],
            [Length.SHORT]: assets.getPosition()[Length.SHORT],
        };
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = config.market.dollarVolume(
                settlementPrice, position[length],
            ).round(config.market.CURRENCY_DP);
            const profit = assets.close({
                length,
                volume: position[length],
                dollarVolume,
            });
            assets.open({
                length,
                volume: position[length],
                dollarVolume,
            });
            margin.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }

    protected abstract clearingMargin(
        length: Length, profit: Big,
    ): Big;

    protected abstract assertEnoughBalance(): void;
}
