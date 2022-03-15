import {
    LimitOrder,
    TexchangeAmendment,
    TexchangeOpenOrder,
    Balances,
    Positions,
    ContextMarketApiLike,
    ContextAccountApiLike,
    MarketEvents,
    AccountEvents,
    HLike,
    TexchangeTradeId,
    TexchangeOrderId,
} from 'interfaces';
import { EventEmitter } from 'events';
import { Context } from '../context';
import { Instant } from './instant';



export class Latency<H extends HLike<H>>
    extends EventEmitter
    implements
    ContextMarketApiLike<H, TexchangeTradeId>,
    ContextAccountApiLike<H, TexchangeOrderId> {

    constructor(
        private context: Context<H>,
        private instant: Instant<H>,
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

    public async makeOrders(orders: LimitOrder<H>[]): Promise<(TexchangeOpenOrder<H> | Error)[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.makeOrders(orders);
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async amendOrders(amendments: TexchangeAmendment<H>[]): Promise<(TexchangeOpenOrder<H> | Error)[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.amendOrders(amendments);
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async cancelOrders(orders: TexchangeOpenOrder<H>[]): Promise<TexchangeOpenOrder<H>[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.cancelOrders(orders);
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getBalances(): Promise<Balances<H>> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getBalances();
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getPositions(): Promise<Positions<H>> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getPositions();
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }

    public async getOpenOrders(): Promise<TexchangeOpenOrder<H>[]> {
        try {
            await this.context.timeline.sleep(this.context.config.market.PING);
            await this.context.timeline.sleep(this.context.config.market.PROCESSING);
            return this.instant.getOpenOrders();
        } finally {
            await this.context.timeline.sleep(this.context.config.market.PING);
        }
    }
}

export type Events<H extends HLike<H>>
    = MarketEvents<H, TexchangeTradeId> & AccountEvents<H>;

export interface Latency<H extends HLike<H>> {
    on<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    once<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    off<Event extends keyof Events<H>>(event: Event, listener: (...args: Events<H>[Event]) => void): this;
    emit<Event extends keyof Events<H>>(event: Event, ...args: Events<H>[Event]): boolean;
}
