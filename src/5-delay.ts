import { ManagingAssets } from './4-assets';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    ContextMarketPublicApiLike,
    ContextAccountPrivateApiLike,
    Config,
    OpenOrder,
    clone,
} from './interfaces';

class Texchange extends ManagingAssets implements
    ContextMarketPublicApiLike,
    ContextAccountPrivateApiLike {
    constructor(
        config: Config,
        private sleep: (ms: number) => Promise<void>,
        now: () => number,
    ) {
        super(config, now);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return super.makeLimitOrder(order);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            await super.cancelOrder(oid);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getAssets(): Promise<Assets> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return clone(await super.getAssets());
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return clone(await super.getOpenOrders());
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    protected async pushOrderbook(): Promise<void> {
        const orderbook = clone(this.orderbook);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }

    protected async pushRawTrades(rawTrades: RawTrade[]): Promise<void> {
        const trades = this.rawTrade2Trade(rawTrades);
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
    }
}

export {
    Texchange as default,
    Texchange,
}
