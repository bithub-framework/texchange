import {
    Length,
} from '../interfaces';
import { Hub } from '../hub';


export class MethodsClearing {
    constructor(
        private core: Hub,
    ) { }

    public settle(): void {
        const { calculation } = this.core;
        const { assets, mtm, margin } = this.core.states;

        const position = {
            [Length.LONG]: assets.position[Length.LONG],
            [Length.SHORT]: assets.position[Length.SHORT],
        };
        for (const length of [Length.LONG, Length.SHORT]) {
            const dollarVolume = calculation.dollarVolume(
                mtm.getSettlementPrice(), position[length],
            ).round(this.core.config.CURRENCY_DP);
            const profit = assets.closePosition(
                length, position[length], dollarVolume,
            );
            assets.openPosition(
                length, position[length], dollarVolume,
            );
            margin[length] = calculation.marginOnSettlement(length, profit);
        }
        if (calculation.shouldLiquidate().length)
            this.core.stop(new Error('Liquidated.'));
    }
}
