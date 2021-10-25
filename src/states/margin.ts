import {
    Length,
    Frozen,
    StateLike,
    Closable,
    Parsed,
} from '../interfaces';
import Big from 'big.js';
// import { inspect } from 'util';
import { Core } from '../core';


export interface Snapshot {
    [length: number]: Big;
}


export class StateMargin implements StateLike<Snapshot> {
    [length: number]: Big;

    constructor(private core: Core) {
        this[Length.LONG] = new Big(0);
        this[Length.SHORT] = new Big(0);
    }

    public get frozen(): Frozen {
        return this.core.states.makers.totalFrozen;
    }

    public get available(): Big {
        return this.core.states.assets.balance
            .minus(this.core.calculation.totalMargin())
            .minus(this.core.calculation.totalFrozenBalance());
    }

    public get closable(): Closable {
        const { assets } = this.core.states;
        return {
            [Length.LONG]: assets.position[Length.LONG]
                .minus(this.frozen.position[Length.LONG]),
            [Length.SHORT]: assets.position[Length.SHORT]
                .minus(this.frozen.position[Length.SHORT]),
        };
    }

    public incMargin(length: Length, volume: Big, dollarVolume: Big): void {
        this[length] = this[length]
            .plus(
                this.core.calculation.marginIncrement(
                    length, volume, dollarVolume,
                )
            ).round(this.core.config.CURRENCY_DP);
    }

    public decMargin(length: Length, volume: Big, dollarVolume: Big): void {
        const { assets } = this.core.states;
        if (volume.lte(assets.position[length])) {
            this[length] = this[length]
                .times(assets.position[length].minus(volume))
                .div(assets.position[length])
                .round(this.core.config.CURRENCY_DP);
        } else {
            const restVolume = volume.minus(assets.position[length]);
            const restDollarVolume = dollarVolume
                .times(restVolume)
                .div(volume)
                .round(this.core.config.CURRENCY_DP);
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

    public restore(snapshot: Parsed<Snapshot>): void {
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
