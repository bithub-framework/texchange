import { ManagingAssets } from './4-assets';
import {
    LimitOrder,
    LimitOrderAmendment,
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
import Big from 'big.js';

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

    public async makeLimitOrders(orders: LimitOrder[]): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.makeLimitOrderSync(order));
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async amendLimitOrders(
        amendments: LimitOrderAmendment[]
    ): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return amendments.map(order => this.amendLimitOrderSync(order));
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.cancelOrderSync(order));
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
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }

    protected async pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void> {
        const trades = clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PROCESSING);
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
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}

export {
    Texchange as default,
    Texchange,
}
