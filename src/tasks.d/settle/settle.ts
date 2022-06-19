import {
    Length,
    HLike,
    MarketSpec,
} from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Assets } from '../../models.d/assets';
import { Margins } from '../../models.d/margins';
import { Pricing } from '../../models.d/pricing/pricing';


export abstract class TaskSettle<H extends HLike<H>> {
    @instantInject(TYPES.tasks)
    protected tasks!: TaskSettle.TaskDeps<H>;

    protected abstract context: Context<H>;
    protected abstract marketSpec: MarketSpec<H>;
    protected abstract models: TaskSettle.ModelDeps<H>;
    protected abstract broadcast: Broadcast<H>;


    public settle(): void {
        const { assets, margins, pricing } = this.models;

        const position = assets.getPosition();
        const settlementPrice = pricing.getSettlementPrice();
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = this.marketSpec.dollarVolume(
                settlementPrice, position[length],
            ).round(this.marketSpec.CURRENCY_DP);
            const profit = assets.close(
                length,
                position[length],
                dollarVolume,
            );
            assets.open(
                length,
                position[length],
                dollarVolume,
            );
            margins.setMargin(length, this.clearingMargin(length, profit));
        }
        this.assertEnoughBalance();
    }

    protected abstract clearingMargin(
        length: Length, profit: H,
    ): H;

    protected abstract assertEnoughBalance(): void;
}

export namespace TaskSettle {
    export interface ModelDeps<H extends HLike<H>> {
        assets: Assets<H>;
        margins: Margins<H>;
        pricing: Pricing<H, unknown>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}
