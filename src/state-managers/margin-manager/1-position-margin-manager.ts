import {
    Config,
} from '../../interfaces';
import Big from 'big.js';
import { EquityManager } from '../equity-manager';


export abstract class MarginManager {
    public abstract marginSum: Big;
    protected abstract config: Config;
    protected abstract getSettlementPrice: () => Big;
    protected abstract getLatestPrice: () => Big;
    protected abstract equity: EquityManager;

    public get margin(): Big {
        return this.config.reviseMargin({
            spec: this.config,
            position: this.equity.position,
            cost: this.equity.cost,
            settlementPrice: this.getSettlementPrice(),
            latestPrice: this.getLatestPrice(),
            marginSum: this.marginSum,
        }).round(this.config.CURRENCY_DP);
    }

    public incMargin(increment: Big) {
        this.marginSum = this.marginSum.plus(increment);
    }

    public decMargin(decrement: Big) {
        this.marginSum = this.marginSum.minus(decrement);
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
