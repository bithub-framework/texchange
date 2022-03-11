import {
    LimitOrder,
    Amendment,
    OpenOrder,
    Balances,
    Positions,
    ContextMarketApiLike,
    ContextAccountApiLike,
    MarketEvents,
    AccountEvents,
} from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Instant } from './instant';



export class Latency extends EventEmitter
    implements ContextMarketApiLike, ContextAccountApiLike {

    constructor(
        private context: Context,
        private instant: Instant,
    ) {
        super();
        this.instant.on('orderbook', async orderbook => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.emit('orderbook', orderbook);
            } catch (err) {
                this.emit('error', <Error>err);
            }
        });
        this.instant.on('trades', async trades => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.emit('trades', trades);
            } catch (err) {
                this.emit('error', <Error>err);
            }
        });
        this.instant.on('positions', async positions => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.emit('positions', positions);
            } catch (err) {
                this.emit('error', <Error>err);
            }
        });
        this.instant.on('balances', async balances => {
            try {
                await this.context.timeline.sleep(this.context.config.market.PROCESSING);
                await this.context.timeline.sleep(this.context.config.market.PING);
                this.emit('balances', balances);
            } catch (err) {
                this.emit('error', <Error>err);
            }
        });
    }

    public async makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.makeOrders(orders);
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.amendOrders(amendments);
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.cancelOrders(orders);
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getBalances();
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getPositions();
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getOpenOrders();
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
}

export type Events = MarketEvents & AccountEvents;

export interface Latency {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
