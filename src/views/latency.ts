import {
    LimitOrder,
    Amendment,
    OpenOrder,
    Balances,
    Positions,
    Events,
    ApiLike,
} from '../interfaces';
import { EventEmitter } from 'events';
import { type Hub } from '../hub';


export class Latency extends EventEmitter implements ApiLike {
    constructor(private hub: Hub) {
        super();
        this.hub.views.instant.on('orderbook', async orderbook => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('orderbook', orderbook);
            } catch (err) {
                this.hub.stop(<Error>err);
            }
        });
        this.hub.views.instant.on('trades', async trades => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('trades', trades);
            } catch (err) {
                this.hub.stop(<Error>err);
            }
        });
        this.hub.views.instant.on('positions', async positions => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('positions', positions);
            } catch (err) {
                this.hub.stop(<Error>err);
            }
        });
        this.hub.views.instant.on('balances', async balances => {
            try {
                await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
                await this.hub.context.timeline.sleep(this.hub.context.config.PING);
                this.emit('balances', balances);
            } catch (err) {
                this.hub.stop(<Error>err);
            }
        });
    }

    public async makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.makeOrders(orders);
        } finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }

    public async amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.amendOrders(amendments);
        } finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.cancelOrders(orders);
        } finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.getBalances();
        } finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.getPositions();
        } finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
            await this.hub.context.timeline.sleep(this.hub.context.config.PROCESSING);
            return this.hub.views.instant.getOpenOrders();
        } finally {
            await this.hub.context.timeline.sleep(this.hub.context.config.PING);
        }
    }
}

export interface Latency {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
