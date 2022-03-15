import { EventEmitter } from 'events';
import { Context } from '../context';
import {
    ConcreteOpenOrder,
    ConcreteLimitOrder,
    ConcreteAmendment,
    ConcretePositions,
    ConcreteBalances,
    ConcreteTradeId,
    MarketEvents,
    AccountEvents,
} from 'interfaces';
import { UseCasesLike } from '../use-cases';
import { HLike } from 'interfaces';


export class Instant<H extends HLike<H>>
    extends EventEmitter {
    constructor(
        private context: Context<H>,
        private useCases: UseCasesLike<H>,
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

    public makeOrders(
        orders: readonly ConcreteLimitOrder<H>[],
    ): (ConcreteOpenOrder<H> | Error)[] {
        return orders.map(order => {
            try {
                return this.useCases.makeOrder.makeOrder(order);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public cancelOrders(
        orders: readonly ConcreteOpenOrder<H>[],
    ): ConcreteOpenOrder<H>[] {
        return orders.map(order => this.useCases.cancelOrder.cancelOrder(order));
    }

    public amendOrders(
        amendments: readonly ConcreteAmendment<H>[],
    ): (ConcreteOpenOrder<H> | Error)[] {
        return amendments.map(amendment => {
            try {
                return this.useCases.amendOrder.amendOrder(amendment);
            } catch (err) {
                return <Error>err;
            }
        });
    }

    public getOpenOrders(): ConcreteOpenOrder<H>[] {
        return this.useCases.getOpenOrders.getOpenOrders();
    }

    public getPositions(): ConcretePositions<H> {
        return this.useCases.getPositions.getPositions();
    }

    public getBalances(): ConcreteBalances<H> {
        return this.useCases.getBalances.getBalances();
    }
}

export type Events<H extends HLike<H>>
    = MarketEvents<H, ConcreteTradeId> & AccountEvents<H>;

export interface Instant<H extends HLike<H>> extends EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
