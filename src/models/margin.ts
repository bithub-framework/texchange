import {
    Length,
    TypeRecur,
} from '../interfaces';
import { StatefulLike } from 'startable';
import Big from 'big.js';
// import { inspect } from 'util';
import { type Hub } from '../hub';


interface Deps extends Pick<Hub, 'context'> {
    models: Pick<Hub['models'], 'assets'>;
}


interface Snapshot {
    [length: number]: Big;
}
type Backup = Readonly<TypeRecur<Snapshot, Big, string>>;


export class Margin implements StatefulLike<Snapshot, Backup> {
    [length: number]: Big;

    constructor(private hub: Deps) {
        this[Length.LONG] = new Big(0);
        this[Length.SHORT] = new Big(0);
    }

    public incMargin(length: Length, volume: Big, dollarVolume: Big): void {
        this[length] = this[length]
            .plus(
                this.hub.context.calculation.marginIncrement(
                    length, volume, dollarVolume,
                )
            ).round(this.hub.context.config.CURRENCY_DP);
    }

    // TODO try
    public decMargin(length: Length, volume: Big, dollarVolume: Big): void {
        const { assets } = this.hub.models;
        const { calculation } = this.hub.context;
        if (volume.lte(assets.position[length])) {
            this[length] = this[length]
                .minus(calculation.marginDecrement(
                    length, volume, dollarVolume,
                ))
                .round(this.hub.context.config.CURRENCY_DP);
        } else {
            const restVolume = volume.minus(assets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.hub.context.config.CURRENCY_DP);
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
