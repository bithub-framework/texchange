import Big from 'big.js';
import {
    Length,
} from '../../interfaces';



export abstract class MarginManager {
    public abstract positionMargin: {
        [length: number]: Big;
    };

    public incPositionMargin(
        length: Length,
        increment: Big,
    ) {
        this.positionMargin[length] = this.positionMargin[length].plus(increment);
    }

    public decPositionMargin(
        length: Length,
        decrement: Big,
    ) {
        this.positionMargin[length] = this.positionMargin[length].minus(decrement);
    }

    public setPositionMargin(
        length: Length,
        positionMargin: Big,
    ) {
        this.positionMargin[length] = positionMargin;
    }

    // public decMargin(volume: Big) {
    //     const totalPosition = this.position[Length.LONG].plus(this.position[Length.SHORT]);
    //     this.autoMargin = totalPosition.eq(volume)
    //         ? new Big(0)
    //         : this.autoMargin.minus(
    //             this.config.calcMarginDecrement({
    //                 spec: this.config,
    //                 assets: this,
    //                 volume,
    //             }).round(this.config.CURRENCY_DP),
    //         );
    // }
}
