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
        const orderbook = this.core.states.orderbook.getBook();
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

    public pushPositionsAndBalances(): void {
        this.emit('positions', this.getPositions());
        this.emit('balances', this.getBalances());
    }

    public makeOrders(orders: LimitOrder[]): (OpenOrder | Error)[] {
        return orders.map((order): OpenOrder | Error => {
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
                const returnedOrder = this.core.ordering.makeOpenOrder(openOrder);
                return {
                    price: returnedOrder.price,
                    quantity: returnedOrder.quantity,
                    side: returnedOrder.side,
                    length: returnedOrder.length,
                    operation: returnedOrder.operation,
                    id: returnedOrder.id,
                    filled: returnedOrder.filled,
                    unfilled: returnedOrder.unfilled,
                };
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(orders: OpenOrder[]): OpenOrder[] {
        return orders.map(order => {
            const returnedOrder = this.core.ordering.cancelOpenOrder(order);
            return {
                price: returnedOrder.price,
                quantity: returnedOrder.quantity,
                side: returnedOrder.side,
                length: returnedOrder.length,
                operation: returnedOrder.operation,
                id: returnedOrder.id,
                filled: returnedOrder.filled,
                unfilled: returnedOrder.unfilled,
            }
        });
    }

    public amendOrders(amendments: Amendment[]): (OpenOrder | Error)[] {
        return amendments.map((amendment): OpenOrder | Error => {
            try {
                const { filled } = this.core.ordering.cancelOpenOrder(amendment);
                const openOrder: OpenOrder = {
                    price: amendment.newPrice,
                    unfilled: amendment.newUnfilled,
                    quantity: amendment.newUnfilled.plus(filled),
                    filled,
                    id: amendment.id,
                    side: amendment.side,
                    length: amendment.length,
                    operation: amendment.operation,
                };
                this.core.validation.validateOrder(openOrder);
                const returnedOrder = this.core.ordering.makeOpenOrder(openOrder);
                return {
                    price: returnedOrder.price,
                    quantity: returnedOrder.quantity,
                    side: returnedOrder.side,
                    length: returnedOrder.length,
                    operation: returnedOrder.operation,
                    id: returnedOrder.id,
                    filled: returnedOrder.filled,
                    unfilled: returnedOrder.unfilled,
                };
            } catch (err) {
                return <Error>err;
            }
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
            closable: {
                [Length.LONG]: this.core.states.margin.closable[Length.LONG],
                [Length.SHORT]: this.core.states.margin.closable[Length.SHORT],
            },
            time: this.core.timeline.now(),
        };
    }

    public getBalances(): Balances {
        return {
            balance: this.core.states.assets.balance,
            available: this.core.states.margin.available,
            time: this.core.timeline.now(),
        };
    }
}

export interface InterfaceInstant {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
