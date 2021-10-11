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

    public clear(): void {
        const position = clone(this.core.states.assets.position);
        for (const length of [Length.LONG, Length.SHORT] as const) {
            const clearingDollarVolume =
                this.core.calculation.dollarVolume(
                    this.core.states.mtm.getMarkPrice(),
                    position[length],
                ).round(this.core.config.CURRENCY_DP);
            this.core.states.assets.closePosition(
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
        }

        for (const length of [Length.LONG, Length.SHORT] as const)
            this.core.states.margin.setPositionMargin(
                length,
                this.core.calculation.positionMarginOnClearing(),
            );
    }
}
