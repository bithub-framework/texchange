import { ManagingAssets } from './managing-assets';
import {
    Assets,
    LimitOrder,
    BID,
    OrderId,
    RawTrade,
} from './interfaces';
import {
    PING,
    PROCESSING,
} from './config';

class Texchange extends ManagingAssets {
    constructor(
        assets: Assets,
        private sleep: (ms: number) => Promise<void>,
        now: () => number,
    ) {
        super(assets, now);
    }

    public async makeLimitOrder(
        order: LimitOrder,
        open = order.side === BID,
    ): Promise<OrderId> {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        const oid = await super.makeLimitOrder(order, open);
        await this.sleep(PING);
        return oid;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        await super.cancelOrder(oid);
        await this.sleep(PING);
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
