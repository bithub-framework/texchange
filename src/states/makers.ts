import {
    OrderId,
    OpenMaker,
    Frozen,
    StateLike,
    TypeRecur,
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
    public totalUnfilled: {
        [side: number]: Big;
    } = {};

    constructor(
        private core: Core,
        snapshot?: TypeRecur<Snapshot, Big, string>,
    ) {
        super();
        if (snapshot)
            for (const { order, frozen } of snapshot) {
                this.set(order.id, {
                    price: new Big(order.price),
                    quantity: new Big(order.quantity),
                    side: order.side,
                    length: order.length,
                    operation: order.operation,
                    filled: new Big(order.filled),
                    unfilled: new Big(order.unfilled),
                    id: order.id,
                    behind: new Big(order.behind),
                });
                this.frozens.set(order.id, {
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

    public capture(): Snapshot {
        return [...this.keys()]
            .map(oid => ({
                order: this.get(oid)!,
                frozen: this.frozens.get(oid)!,
            }));
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

    public addOrder(order: OpenMaker): Frozen {
        const toFreeze: Frozen = this.normalizeFrozen(
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
        dollarVolume: Big,
    ): Frozen {
        const order = this.get(oid);
        assert(order);
        const oldFrozen = this.frozens.get(oid)!;
        assert(volume.lte(order.unfilled));

        const toThaw: Frozen = this.normalizeFrozen(
            this.core.calculation.toThaw(order, oldFrozen, volume, dollarVolume),
        );

        const newFrozen = Frozen.minus(oldFrozen, toThaw);
        this.frozens.set(oid, newFrozen);

        order.filled = order.filled.plus(volume);
        order.unfilled = order.unfilled.minus(volume);
        this.totalUnfilled[order.side] = this.totalUnfilled[order.side].minus(volume);

        if (order.unfilled.eq(0)) {
            this.delete(oid);
            this.frozens.delete(oid);
        }

        return toThaw;
    }

    public removeOrder(oid: OrderId): Frozen | null {
        const order = this.get(oid);
        const frozen = this.frozens.get(oid)!;
        if (!order) return null;

        this.delete(oid);
        this.frozens.delete(oid);
        this.totalUnfilled[order.side] = this.totalUnfilled[order.side]
            .minus(order.unfilled);

        return frozen;
    }
}
