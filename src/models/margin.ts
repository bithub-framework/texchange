import {
    Length,
    TypeRecur,
} from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
// import { inspect } from 'util';
import { type Hub } from '../hub';

interface Snapshot {
    [length: number]: Big;
}
type Backup = TypeRecur<Snapshot, Big, string>;


export class Margin implements StatefulLike<Snapshot, Backup> {
    [length: number]: Big;

    constructor(private core: Hub) {
        this[Length.LONG] = new Big(0);
        this[Length.SHORT] = new Big(0);
    }

    public incMargin(length: Length, volume: Big, dollarVolume: Big): void {
        this[length] = this[length]
            .plus(
                this.core.context.calculation.marginIncrement(
                    length, volume, dollarVolume,
                )
            ).round(this.core.context.config.CURRENCY_DP);
    }

    public decMargin(length: Length, volume: Big, dollarVolume: Big): void {
        const { assets } = this.core.models;
        if (volume.lte(assets.position[length])) {
            this[length] = this[length]
                .times(assets.position[length].minus(volume))
                .div(assets.position[length])
                .round(this.core.context.config.CURRENCY_DP);
        } else {
            const restVolume = volume.minus(assets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.core.context.config.CURRENCY_DP);
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
}
