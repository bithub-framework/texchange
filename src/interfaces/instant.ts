import { EventEmitter } from 'events';
import {
    Events,
    Trade,
    OpenOrder,
    LimitOrder,
    Amendment,
    Positions,
    Balances,
    Side, Length,
    Closable,
} from '../interfaces';
import Big from 'big.js';
import { Core } from '../core';


export class InterfaceInstant extends EventEmitter {
    constructor(
        private core: Core,
    ) {
        super();
    }

    public pushTrades(trades: Trade[]): void {
        this.emit('trades', trades.map(trade => ({
            id: trade.id,
            price: trade.price,
            quantity: trade.quantity,
            side: trade.side,
            time: trade.time,
        })));
    }

    public pushOrderbook(): void {
        const { orderbook } = this.core.states;
        this.emit('orderbook', {
            [Side.ASK]: orderbook[Side.ASK].map(order => ({
                price: order.price,
                quantity: order.quantity,
                side: order.side,
            })),
            [Side.BID]: orderbook[Side.BID].map(order => ({
                price: order.price,
                quantity: order.quantity,
                side: order.side,
            })),
            time: orderbook.time,
        });
    }

    public makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[] {
        return orders.map(order => this.makeOpenOrder({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: ++this.core.states.misc.userOrderCount,
            filled: new Big(0),
            unfilled: order.quantity,
        }));
    }

    /**
     * @returns As duplicate.
     */
    private makeOpenOrder(order: OpenOrder): OpenOrder | Error {
        try {
            const openOrder: OpenOrder = {
                price: order.price,
                quantity: order.quantity,
                side: order.side,
                length: order.length,
                operation: order.operation,
                id: ++this.core.states.misc.userOrderCount,
                filled: new Big(0),
                unfilled: order.quantity,
            };
            this.core.validation.validateOrder(openOrder);
            const trades = this.core.taking.orderTakes(openOrder);
            this.core.making.orderMakes(openOrder);
            if (trades.length) {
                this.core.interfaces.instant.pushTrades(trades);
                this.core.interfaces.instant.pushOrderbook();
                this.core.interfaces.instant.pushBalances();
                this.core.interfaces.instant.pushPositions();
            }
            return openOrder
        } catch (err) {
            return <Error>err;
        }
    }

    public cancelOrders(orders: OpenOrder[]): OpenOrder[] {
        return orders.map(order => this.cancelOpenOrder(order));
    }

    /**
     * @returns As duplicate.
     */
    private cancelOpenOrder(order: OpenOrder): OpenOrder {
        const { makers } = this.core.states;
        let filled = makers.get(order.id)?.filled;
        if (typeof filled === 'undefined')
            filled = order.quantity;
        else
            makers.removeOrder(order.id)!;
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }

    public amendOrders(amendments: Amendment[]): (OpenOrder | Error)[] {
        return amendments.map(amendment => {
            const oldOrder = this.cancelOpenOrder(amendment);
            const newOrder: OpenOrder = {
                price: amendment.newPrice,
                filled: oldOrder.filled,
                unfilled: amendment.newUnfilled,
                quantity: amendment.newUnfilled.plus(oldOrder.filled),
                id: amendment.id,
                side: amendment.side,
                length: amendment.length,
                operation: amendment.operation,
            };
            return this.makeOpenOrder(newOrder);
        });
    }

    public getOpenOrders(): OpenOrder[] {
        const openOrders = [...this.core.states.makers.values()];
        return openOrders.map(order => ({
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled: order.filled,
            unfilled: order.unfilled,
        }));
    }

    public getPositions(): Positions {
        return {
            position: {
                [Length.LONG]: this.core.states.assets.position[Length.LONG],
                [Length.SHORT]: this.core.states.assets.position[Length.SHORT],
            },
            closable: this.getClosable(),
            time: this.core.timeline.now(),
        };
    }

    public getBalances(): Balances {
        return {
            balance: this.core.states.assets.balance,
            available: this.getAvailable(),
            time: this.core.timeline.now(),
        };
    }

    public pushBalances(): void {
        this.emit('balances', this.getBalances());
    }

    public pushPositions(): void {
        this.emit('positions', this.getPositions());
    }

    public getAvailable(): Big {
        return this.core.states.assets.balance
            .minus(this.core.calculation.finalMargin())
            .minus(this.core.calculation.finalFrozenBalance());
    }

    public getClosable(): Closable {
        const { assets, makers } = this.core.states;
        return {
            [Length.LONG]: assets.position[Length.LONG]
                .minus(makers.frozenSum.position[Length.LONG]),
            [Length.SHORT]: assets.position[Length.SHORT]
                .minus(makers.frozenSum.position[Length.SHORT]),
        };
    }
}

export interface InterfaceInstant {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
