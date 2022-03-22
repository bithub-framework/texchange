import {
    Length,
    Position,
    HLike,
} from 'interfaces';
import { Context } from '../../context';
import { SettleLike } from './settle-like';
import { Broadcast } from '../../broadcast';

import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing';


export abstract class Settle<H extends HLike<H>>
    implements SettleLike {

    protected abstract readonly context: Context<H>;
    protected abstract readonly models: Settle.ModelDeps<H>;
    protected abstract readonly broadcast: Broadcast<H>;
    protected abstract readonly tasks: Settle.TaskDeps<H>;

    public settle(): void {
        const { config } = this.context;
        const { assets, margins, pricing } = this.models;

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
            margins.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }

    protected abstract clearingMargin(
        length: Length, profit: H,
    ): H;

    protected abstract assertEnoughBalance(): void;
}

export namespace Settle {
    export interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        pricing: Pricing<H, unknown>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}
