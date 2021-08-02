import Big from 'big.js';


export abstract class MarginManager {
    public abstract positionMargin: Big;

    public incPositionMargin(increment: Big) {
        this.positionMargin = this.positionMargin.plus(increment);
    }

    public decPositionMargin(decrement: Big) {
        this.positionMargin = this.positionMargin.minus(decrement);
    }

    public setPositionMargin(positionMargin: Big) {
        this.positionMargin = positionMargin;
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
