import {
    Length,
    clone,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';


export class MethodsClearing {
    constructor(
        private core: Core,
    ) { }

    public settle(): void {
        const position = clone(this.core.states.assets.position);
        for (const length of [Length.LONG, Length.SHORT]) {
            const clearingDollarVolume =
                this.core.calculation.dollarVolume(
                    this.core.states.mtm.getSettlementPrice(),
                    position[length],
                ).round(this.core.config.CURRENCY_DP);
            const profit = this.core.states.assets.closePosition(
                length,
                position[length],
                clearingDollarVolume,
                new Big(0),
            );
            this.core.states.assets.openPosition(
                length,
                position[length],
                clearingDollarVolume,
                new Big(0),
            );
            this.core.states.margin[length] =
                this.core.calculation.marginOnSettlement(length, profit);
        }
        if (this.core.calculation.shouldLiquidate().length)
            this.core.stop(new Error('Liquidated.'));
    }
}
