import { EventEmitter } from 'events';
import { Context } from '../context';
import {
    Trade,
    OpenOrder,
    LimitOrder,
    Amendment,
    Positions,
    Balances,
    Side, Length,
    Closable,
    MarketEvents,
    AccountEvents,
} from 'interfaces';
import { UseCasesLike } from '../use-cases';



export class Instant extends EventEmitter {
    constructor(
        private context: Context,
        private useCases: UseCasesLike,
    ) {
        super();
        // this.initializePushingTrades();
        // this.initializePushingOrderbook();
    }

    // private initializePushingTrades(): void {
    //     this.tasks.on('pushTrades', trades => {
    //         this.emit('trades', trades.map(trade => ({
    //             id: trade.id,
    //             price: trade.price,
    //             quantity: trade.quantity,
    //             side: trade.side,
    //             time: trade.time,
    //         })));
    //     })
    // }

    // private initializePushingOrderbook(): void {
    //     this.scheduler.on('pushOrderbook', orderbook => {
    //         this.emit('orderbook', {
    //             [Side.ASK]: orderbook[Side.ASK].map(order => ({
    //                 price: order.price,
    //                 quantity: order.quantity,
    //                 side: order.side,
    //             })),
    //             [Side.BID]: orderbook[Side.BID].map(order => ({
    //                 price: order.price,
    //                 quantity: order.quantity,
    //                 side: order.side,
    //             })),
    //             time: orderbook.time,
    //         });
    //     });
    // }

    public makeOrders(orders: readonly Readonly<LimitOrder>[]): (OpenOrder | Error)[] {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(orders: readonly Readonly<OpenOrder>[]): OpenOrder[] {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }

    public amendOrders(
        amendments: readonly Readonly<Amendment>[],
    ): (OpenOrder | Error)[] {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public getOpenOrders(): OpenOrder[] {
        return this.useCases.getOpenOrders.getOpenOrders();
    }

    public getPositions(): Positions {
        return this.useCases.getPositions.getPositions();
    }

    public getBalances(): Balances {
        return this.useCases.getBalances.getBalances();
    }
}

export type Events = MarketEvents & AccountEvents;

export interface Instant extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
