/// <reference types="node" />
import { LimitOrder, Balances, Positions, MarketApiLike, AccountApiLike, MarketEvents, AccountEvents, MarketCalc, HLike } from 'interfaces';
import { TradeId, OrderId, OpenOrder, Amendment } from '../interfaces';
import { Context } from '../context';
import { Instant } from './instant';
import { Subscription } from '../use-cases.d/subscription';
export declare class Latency<H extends HLike<H>> implements MarketApiLike<H, OrderId, TradeId>, AccountApiLike<H, OrderId, TradeId>, MarketCalc<H> {
    private context;
    private useCases;
    private instant;
    events: EventsLike<H>;
    private Orderbook;
    private TradeId;
    private Trade;
    private Positions;
    private Balances;
    private LimitOrder;
    private OrderId;
    private Amendment;
    private OpenOrder;
    constructor(context: Context<H>, useCases: Latency.UseCaseDeps<H>, instant: Instant<H>);
    makeOrders($orders: LimitOrder<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    amendOrders($amendments: Amendment<H>[]): Promise<(OpenOrder<H> | Error)[]>;
    cancelOrders($orders: OpenOrder<H>[]): Promise<OpenOrder<H>[]>;
    getBalances(): Promise<Balances<H>>;
    getPositions(): Promise<Positions<H>>;
    getOpenOrders(): Promise<OpenOrder<H>[]>;
    quantity(price: H, dollarVolume: H): H;
    dollarVolume(price: H, quantity: H): H;
}
export declare namespace Latency {
    interface UseCaseDeps<H extends HLike<H>> {
        subscription: Subscription<H>;
    }
}
export declare type Events<H extends HLike<H>> = MarketEvents<H, OrderId, TradeId> & AccountEvents<H, OrderId, TradeId>;
export interface EventsLike<H extends HLike<H>> extends NodeJS.EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
