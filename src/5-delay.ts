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
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        const oid = await super.makeLimitOrder(order);
        await this.sleep(this.config.PING);
        return oid;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        await super.cancelOrder(oid);
        await this.sleep(this.config.PING);
    }

    public async getAssets(): Promise<Assets> {
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        const assets = clone(await super.getAssets());
        await this.sleep(this.config.PING);
        return assets;
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        const openOrders = clone(await super.getOpenOrders());
        await this.sleep(this.config.PING);
        return openOrders;
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
