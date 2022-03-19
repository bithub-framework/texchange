import {
    Length,
    Position,
    HLike,
} from 'interfaces';
import { Context } from '../../context';
import { Models } from '../../models/models';
import { Task } from '../../task';
import { Tasks, SettleLike } from '../../tasks/tasks';
import { Broadcast } from '../../broadcast';


export abstract class Settle<H extends HLike<H>>
    extends Task<H>
    implements SettleLike {

    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Models<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: Tasks<H>;

    public settle(): void {
        const { config } = this.context;
        const { assets, margins: margin, pricing } = this.models;

        const position: Position<H> = {
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
        length: Length, profit: H,
    ): H;

    protected abstract assertEnoughBalance(): void;
}
