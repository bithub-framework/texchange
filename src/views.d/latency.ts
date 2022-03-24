import {
    LimitOrder,
    TexchangeAmendment,
    TexchangeOpenOrder,
    Balances,
    Positions,
    MarketApiLike,
    AccountApiLike,
    MarketEvents,
    AccountEvents,
    MarketCalc,
    HLike,
    TexchangeTradeId,
    TexchangeTradeIdStatic,
    TexchangeOrderId,
    OrderbookStatic,
    TradeStatic,
    PositionsStatic,
    BalancesStatic,
    LimitOrderStatic,
    TexchangeOrderIdStatic,
    TexchangeOpenOrderStatic,
    TexchangeAmendmentStatic
} from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../context/context';
import { Instant } from './instant';

import { Subscription } from '../use-cases.d/subscription';


export class Latency<H extends HLike<H>>
    implements
    MarketApiLike<H, TexchangeOrderId, TexchangeTradeId>,
    AccountApiLike<H, TexchangeOrderId, TexchangeTradeId>,
    MarketCalc<H> {

    public events = <EventsLike<H>>new EventEmitter();

    private Orderbook = new OrderbookStatic(this.context.H);
    private TradeId = new TexchangeTradeIdStatic();
    private Trade = new TradeStatic(this.context.H, this.TradeId);
    private Positions = new PositionsStatic(this.context.H);
    private Balances = new BalancesStatic(this.context.H);
    private LimitOrder = new LimitOrderStatic(this.context.H);
    private OrderId = new TexchangeOrderIdStatic();
    private Amendment = new TexchangeAmendmentStatic(this.context.H, this.OrderId);
    private OpenOrder = new TexchangeOpenOrderStatic(this.context.H, this.OrderId);

    constructor(
        private context: Context<H>,
        private useCases: Latency.UseCaseDeps<H>,
        private instant: Instant<H>,
    ) {
        this.useCases.subscription.on('orderbook', async orderbook => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('orderbook', this.Orderbook.copy(orderbook));
            } catch (err) {
                this.events.emit('error', <Error>err);
            }
        });
        this.useCases.subscription.on('trades', async trades => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('trades', trades.map(trade => this.Trade.copy(trade)));
            } catch (err) {
                this.events.emit('error', <Error>err);
            }
        });
        this.useCases.subscription.on('positions', async positions => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('positions', this.Positions.copy(positions));
            } catch (err) {
                this.events.emit('error', <Error>err);
            }
        });
        this.useCases.subscription.on('balances', async balances => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.events.emit('balances', this.Balances.copy(balances));
            } catch (err) {
                this.events.emit('error', <Error>err);
            }
        });
    }

    public async makeOrders(orders: LimitOrder<H>[]): Promise<(TexchangeOpenOrder<H> | Error)[]> {
        try {
            orders = orders.map(order => this.LimitOrder.copy(order));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.makeOrders(orders).map(order =>
                order instanceof Error
                    ? order
                    : this.OpenOrder.copy(order),
            );
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async amendOrders(amendments: TexchangeAmendment<H>[]): Promise<(TexchangeOpenOrder<H> | Error)[]> {
        try {
            amendments = amendments.map(amendment => this.Amendment.copy(amendment));
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.amendOrders(amendments).map(order =>
                order instanceof Error
                    ? order
                    : this.OpenOrder.copy(order),
            );
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async cancelOrders(orders: TexchangeOpenOrder<H>[]): Promise<TexchangeOpenOrder<H>[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.cancelOrders(orders).map(order =>
                order instanceof Error
                    ? order
                    : this.OpenOrder.copy(order),
            );
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getBalances(): Promise<Balances<H>> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.Balances.copy(this.instant.getBalances());
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getPositions(): Promise<Positions<H>> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.Positions.copy(this.instant.getPositions());
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getOpenOrders(): Promise<TexchangeOpenOrder<H>[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getOpenOrders().map(order =>
                order instanceof Error
                    ? order
                    : this.OpenOrder.copy(order),
            );
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public quantity(price: H, dollarVolume: H): H {
        return this.context.calc.quantity(price, dollarVolume);
    };

    public dollarVolume(price: H, quantity: H): H {
        return this.context.calc.dollarVolume(price, quantity);
    }
}

export namespace Latency {
    export interface UseCaseDeps<H extends HLike<H>> {
        subscription: Subscription<H>;
    }
}

export type Events<H extends HLike<H>>
    = MarketEvents<H, TexchangeOrderId, TexchangeTradeId>
    & AccountEvents<H, TexchangeOrderId, TexchangeTradeId>;

export interface EventsLike<H extends HLike<H>> extends NodeJS.EventEmitter {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
