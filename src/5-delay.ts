import { ManagingAssets } from './4-assets';
import {
    LimitOrder,
    OrderId,
    UnidentifiedTrade,
    ContextMarketPublicApiLike,
    ContextAccountPrivateApiLike,
    Config,
    OpenOrder,
    clone,
    Balances,
    Positions,
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
            return this.makeLimitOrderSync(order);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async remakeLimitOrder(oid: OrderId, order: LimitOrder): Promise<OrderId> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.remakeLimitOrderSync(oid, order);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async cancelOrder(oid: OrderId): Promise<OpenOrder | null> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.cancelOrderSync(oid);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getBalancesSync();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getPositionsSync();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getOpenOrdersSync();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    protected async pushOrderbook(): Promise<void> {
        const orderbook = clone(this.orderbook);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }

    protected async pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void> {
        const trades = clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
    }

    protected async pushPositionsAndBalances(): Promise<void> {
        this.settle();
        const positions: Positions = clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
        const balances: Balances = clone({
            balance: this.assets.balance,
            reserve: this.assets.reserve,
            time: this.now(),
        });
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}

export {
    Texchange as default,
    Texchange,
}
