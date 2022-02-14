import {
    Length,
    TypeRecur,
} from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
import { Context } from '../context/context';
import { Assets } from './assets';
// import { inspect } from 'util';




interface Snapshot {
    [length: number]: Big;
}
type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;


export class Margin implements StatefulLike<Snapshot, Backup> {
    [length: number]: Big;

    constructor(
        private context: Context,
    ) {
        this[Length.LONG] = new Big(0);
        this[Length.SHORT] = new Big(0);
    }

    public incMargin(length: Length, volume: Big, dollarVolume: Big): void {
        this[length] = this[length]
            .plus(
                this.marginIncrement(
                    length, volume, dollarVolume,
                )
            ).round(this.context.config.CURRENCY_DP);
    }

    // TODO try
    public decMargin(
        oldAssets: Assets,
        length: Length, volume: Big, dollarVolume: Big,
    ): void {
        if (volume.lte(oldAssets.position[length])) {
            this[length] = this[length]
                .minus(this.marginDecrement(
                    oldAssets,
                    length, volume, dollarVolume,
                ))
                .round(this.context.config.CURRENCY_DP);
        } else {
            const restVolume = volume.minus(oldAssets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.context.config.CURRENCY_DP);
            this[length] = new Big(0);
            this.incMargin(-length, restVolume, restDollarVolume);
        }
    }

    public capture(): Snapshot {
        return {
            [Length.LONG]: this[Length.LONG],
            [Length.SHORT]: this[Length.SHORT],
        };
    }

    public restore(snapshot: Backup): void {
        this[Length.LONG] = new Big(snapshot[Length.LONG]);
        this[Length.SHORT] = new Big(snapshot[Length.SHORT]);
    }

    // public [inspect.custom]() {
    //     return JSON.stringify({
    //         [Length.LONG]: this[Length.LONG],
    //         [Length.SHORT]: this[Length.SHORT],
    //         frozen: {
    //             position: {
    //                 [Length.LONG]: this.frozen.position[Length.LONG],
    //                 [Length.SHORT]: this.frozen.position[Length.SHORT],
    //             },
    //             balance: {
    //                 [Length.LONG]: this.frozen.balance[Length.LONG],
    //                 [Length.SHORT]: this.frozen.balance[Length.SHORT],
    //             },
    //         },
    //         available: this.available,
    //         closable: this.closable,
    //     });
    // }

    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    protected marginIncrement(
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        // 默认非实时结算
        return dollarVolume.div(this.context.config.LEVERAGE);
    }

    /**
     * this.hub.assets.position[order.length] has not been updated.
     */
    protected marginDecrement(
        oldAssets: Assets,
        length: Length, volume: Big, dollarVolume: Big,
    ): Big {
        return this[length]
            .times(volume)
            .div(oldAssets.position[length]);
    }

}
