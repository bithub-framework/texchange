import { ManagingAssets } from './managing-assets';
import { clone } from 'ramda';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    ContextMarketPublicApiLike,
    ContextAccountPrivateApiLike,
    Config,
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
        const assets = clone(super.getAssets());
        await this.sleep(this.config.PING);
        return assets;
    }

    protected async pushOrderbook(): Promise<void> {
        const orderbook = this.latestOrderbook();
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
