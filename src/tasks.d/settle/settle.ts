import {
    Length,
    Position,
    HLike,
} from 'interfaces';
import { Context } from '../../context/context';
import { SettleLike } from './settle-like';
import { Broadcast } from '../../broadcast';

import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';


export abstract class Settle<H extends HLike<H>>
    implements SettleLike {

    public constructor(
        protected context: Context<H>,
        protected models: Settle.ModelDeps<H>,
        protected broadcast: Broadcast<H>,
        protected tasks: Settle.TaskDeps<H>,
    ) { }

    public settle(): void {
        const { config, calc } = this.context;
        const { assets, margins, pricing } = this.models;

        const position = assets.getPosition();
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = calc.dollarVolume(
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
