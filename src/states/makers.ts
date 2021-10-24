import {
    OrderId,
    OpenMaker,
    Frozen,
    StateLike,
    Parsed,
    Side, Length,
} from '../interfaces';
import Big from 'big.js';
import assert = require('assert');
import { Core } from '../core';


export type Snapshot = {
    order: OpenMaker;
    frozen: Frozen;
}[];


export class StateMakers
    extends Map<OrderId, OpenMaker>
    implements StateLike<Snapshot> {

    private frozens = new Map<OrderId, Frozen>();
    public totalUnfilled: { [side: number]: Big } = {
        [Side.ASK]: new Big(0),
        [Side.BID]: new Big(0),
    };

    constructor(private core: Core) {
        super();
    }

    public capture(): Snapshot {
        return [...this.keys()]
            .map(oid => ({
                order: this.get(oid)!,
                frozen: this.frozens.get(oid)!,
            }));
    }

    public restore(snapshot: Parsed<Snapshot>): void {
        for (const { order, frozen } of snapshot) {
            this.set(order.id!, {
                price: new Big(order.price),
                quantity: new Big(order.quantity),
                side: order.side!,
                length: order.length!,
                operation: order.operation!,
                filled: new Big(order.filled),
                unfilled: new Big(order.unfilled),
                id: order.id!,
                behind: new Big(order.behind),
            });
            this.frozens.set(order.id!, {
                balance: {
                    [Length.LONG]: new Big(frozen.balance[Length.LONG]),
                    [Length.SHORT]: new Big(frozen.balance[Length.SHORT]),
                },
                position: {
                    [Length.LONG]: new Big(frozen.position[Length.LONG]),
                    [Length.SHORT]: new Big(frozen.position[Length.SHORT]),
                },
            });
        }
        for (const side of [Side.ASK, Side.BID]) {
            this.totalUnfilled[side] = [...this.values()]
                .filter(order => order.side === side)
                .reduce((total, order) => total.plus(order.unfilled), new Big(0));
        }
    }

    private normalizeFrozen(frozen: Frozen): Frozen {
        return {
            balance: {
                [Length.LONG]: frozen.balance[Length.LONG].round(this.core.config.CURRENCY_DP),
                [Length.SHORT]: frozen.balance[Length.SHORT].round(this.core.config.CURRENCY_DP),
            },
            position: {
                [Length.LONG]: frozen.position[Length.LONG].round(this.core.config.CURRENCY_DP),
                [Length.SHORT]: frozen.position[Length.SHORT].round(this.core.config.CURRENCY_DP),
            },
        };
    }

    public appendOrder(order: OpenMaker): Frozen {
        const toFreeze = this.normalizeFrozen(
            this.core.calculation.toFreeze(order),
        );
        this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
            .plus(order.unfilled);

        if (order.unfilled.gt(0)) {
            this.set(order.id, order);
            this.frozens.set(order.id, toFreeze);
        }
        return toFreeze;
    }

    public takeOrder(
        oid: OrderId,
        volume: Big,
    ): Frozen {
        const order = this.get(oid);
        assert(order);
        assert(volume.lte(order.unfilled));
        const toThaw = <Frozen>this.removeOrder(oid);
        order.filled = order.filled.plus(volume);
        order.unfilled = order.unfilled.minus(volume);
        const toFreeze = <Frozen>this.appendOrder(order);
        return Frozen.plus(toThaw, toFreeze);
    }

    public removeOrder(oid: OrderId): Frozen | null {
        const order = this.get(oid);
        if (!order) return null;
        const frozen = this.frozens.get(oid)!;

        this.delete(oid);
        this.frozens.delete(oid);
        this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
            .minus(order.unfilled);

        return frozen;
    }
}
