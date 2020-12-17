import { ManagingAssets } from './managing-assets';
import { clone } from 'ramda';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    ContextMarketPublicApiLike,
    ContextAccountPrivateApiLike,
} from './interfaces';
import {
    PING,
    PROCESSING,
} from './config';

class Texchange extends ManagingAssets implements
    ContextMarketPublicApiLike,
    ContextAccountPrivateApiLike {
    constructor(
        assets: Assets,
        private sleep: (ms: number) => Promise<void>,
        now: () => number,
    ) {
        super(assets, now);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        const oid = await super.makeLimitOrder(order);
        await this.sleep(PING);
        return oid;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        await super.cancelOrder(oid);
        await this.sleep(PING);
    }

    public async getAssets(): Promise<Assets> {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        const assets = clone(super.getAssets());
        await this.sleep(PING);
        return assets;
    }

    protected async pushOrderbook(): Promise<void> {
        await this.sleep(PING);
        await super.pushOrderbook();
    }

    protected async pushRawTrades(rawTrades: RawTrade[]): Promise<void> {
        await this.sleep(PING);
        await super.pushRawTrades(rawTrades);
    }
}

export {
    Texchange as default,
    Texchange,
}
