import {
    Length,
    HLike,
    MarketSpec,
} from 'secretary-like';
import { Context } from '../../context';
import { Broadcast } from '../../broadcast';
import { instantInject } from '@zimtsui/injektor';
import { TYPES } from '../../injection/types';

import { Assets } from '../../models.d/margin-assets/assets';
import { MarginAssets } from '../../models.d/margin-assets/margin-assets';
import { Pricing } from '../../models.d/pricing/pricing';


export abstract class Clearinghouse<H extends HLike<H>> {
    protected abstract marketSpec: MarketSpec<H>;
    protected abstract models: TaskSettle.ModelDeps<H>;
    protected abstract assets: MarginAssets<H>;
    protected abstract pricing: Pricing<H, unknown>;

    public settle(): void {
        const position = this.assets.getPosition();
        const settlementPrice = this.pricing.getSettlementPrice();
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = this.marketSpec.dollarVolume(
                settlementPrice, position[length],
            ).round(this.marketSpec.CURRENCY_DP);
            this.assets.clearingClose({
                length,
                volume: position[length],
                dollarVolume,
            });
            this.assets.clearingOpen({
                length,
                volume: position[length],
                dollarVolume,
            });
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
        margins: MarginAssets<H>;
        pricing: Pricing<H, unknown>;
    }

    export interface TaskDeps<H extends HLike<H>> { }
}
