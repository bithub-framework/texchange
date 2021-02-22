import { ManagingAssets, ManagingAssetsEvents } from './4-assets';
import {
    LimitOrder,
    LimitOrderAmendment,
    UnidentifiedTrade,
    ContextMarketApiLike,
    ContextAccountApiLike,
    Config,
    OpenOrder,
    clone,
    Balances,
    Positions,
    Snapshot,
} from './interfaces';

class Texchange extends ManagingAssets implements
    ContextMarketApiLike,
    ContextAccountApiLike {
    constructor(
        config: Config,
        snapshot: Snapshot,
        private sleep: (ms: number) => Promise<void>,
        now: () => number,
    ) {
        super(config, snapshot, now);
    }

    public async makeLimitOrders(orders: LimitOrder[]): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.makeLimitOrderNoDelay(order));
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
            return amendments.map(order => this.amendLimitOrderNoDelay(order));
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.cancelOrderNoDelay(order));
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getBalancesNoDelay();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getPositionsNoDelay();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getOpenOrdersNoDelay();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    protected async pushOrderbook(): Promise<void> {
        const orderbook = clone(this.bookManager);
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
    ManagingAssetsEvents as TexchangeEvents,
}
