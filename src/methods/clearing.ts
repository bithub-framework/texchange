import {
    Length,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';


export class MethodsClearing {
    constructor(
        private core: Core,
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
                length, position[length], dollarVolume, new Big(0),
            );
            assets.openPosition(
                length, position[length], dollarVolume, new Big(0),
            );
            margin[length] = calculation.marginOnSettlement(length, profit);
        }
        if (calculation.shouldLiquidate().length)
            this.core.stop(new Error('Liquidated.'));
    }
}
