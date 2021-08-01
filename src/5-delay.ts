import {
    Texchange as Core,
    Events,
} from './4-assets';
import {
    LimitOrder,
    Amendment,
    ExchangeLike,
    Config,
    OpenOrder,
    Balances,
    Positions,
    Snapshot,
} from './interfaces';
import Big from 'big.js';
import { EventEmitter } from 'events';

class Texchange extends EventEmitter implements ExchangeLike {
    public PRICE_DP: number;
    public CURRENCY_DP: number;
    public QUANTITY_DP: number;
    public TICK_SIZE: Big;
    public calcDollarVolume: (price: Big, quantity: Big) => Big;
    public calcQuantity: (price: Big, dollarVolume: Big) => Big;
    public LEVERAGE: number;
    public TAKER_FEE_RATE: number;
    public MAKER_FEE_RATE: number;
    public ONE_WAY_POSITION: boolean;
    private core: Core;


    constructor(
        private config: Config,
        snapshot: Snapshot,
        private sleep: (ms: number) => Promise<void>,
        now: () => number,
    ) {
        super();
        this.core = new Core(config, snapshot, now);
        ({
            PRICE_DP: this.PRICE_DP,
            CURRENCY_DP: this.CURRENCY_DP,
            QUANTITY_DP: this.QUANTITY_DP,
            TICK_SIZE: this.TICK_SIZE,
            calcDollarVolume: this.calcDollarVolume,
            calcQuantity: this.calcQuantity,
            LEVERAGE: this.LEVERAGE,
            TAKER_FEE_RATE: this.TAKER_FEE_RATE,
            MAKER_FEE_RATE: this.MAKER_FEE_RATE,
            ONE_WAY_POSITION: this.ONE_WAY_POSITION,
        } = config);
        this.core.on('error', err => void this.emit('error', err));
        this.core.on('orderbook', async orderbook => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('orderbook', orderbook);
            } catch (err) {
                this.emit('error', err);
            }
        });
        this.core.on('trades', async trades => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('trades', trades);
            } catch (err) {
                this.emit('error', err);
            }
        });
        this.core.on('positions', async trades => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('positions', trades);
            } catch (err) {
                this.emit('error', err);
            }
        });
        this.core.on('balances', async trades => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('balances', trades);
            } catch (err) {
                this.emit('error', err);
            }
        })
    }

    public async makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.makeOrders(orders);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.amendOrders(amendments);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.cancelOrders(orders);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.getBalances();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.getPositions();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.getOpenOrders();
        } finally {
            await this.sleep(this.config.PING);
        }
    }
}

interface Texchange extends EventEmitter {
    on<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    once<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    off<Event extends keyof Events>(event: Event, listener: (...args: Events[Event]) => void): this;
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): boolean;
}

export {
    Texchange,
    Events,
}
