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
import { Core } from '../core';


export class InterfaceLatency extends EventEmitter implements ApiLike {
    constructor(
        private core: Core,
    ) {
        super();
        this.core.interfaces.instant.on('orderbook', async orderbook => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('orderbook', orderbook);
            } catch (err) {
                this.core.stop(<Error>err);
            }
        });
        this.core.interfaces.instant.on('trades', async trades => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('trades', trades);
            } catch (err) {
                this.core.stop(<Error>err);
            }
        });
        this.core.interfaces.instant.on('positions', async positions => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('positions', positions);
            } catch (err) {
                this.core.stop(<Error>err);
            }
        });
        this.core.interfaces.instant.on('balances', async balances => {
            try {
                await this.core.timeline.sleep(this.core.config.PROCESSING);
                await this.core.timeline.sleep(this.core.config.PING);
                this.emit('balances', balances);
            } catch (err) {
                this.core.stop(<Error>err);
            }
        });
    }

    public async makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.makeOrders(orders);
        } finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }

    public async amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.amendOrders(amendments);
        } finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.cancelOrders(orders);
        } finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.getBalances();
        } finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.getPositions();
        } finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.core.timeline.sleep(this.core.config.PING);
            await this.core.timeline.sleep(this.core.config.PROCESSING);
            return this.core.interfaces.instant.getOpenOrders();
        } finally {
            await this.core.timeline.sleep(this.core.config.PING);
        }
    }
}

export interface InterfaceLatency {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}
