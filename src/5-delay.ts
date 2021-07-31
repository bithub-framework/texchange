import {
    Texchange as Parent,
    Events,
} from './4-assets';
import {
    LimitOrder,
    Amendment,
    UnidentifiedTrade,
    ExchangeLike,
    Config,
    OpenOrder,
    clone,
    Balances,
    Positions,
    Snapshot,
} from './interfaces';
import Big from 'big.js';

class Texchange extends Parent implements ExchangeLike {
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


    constructor(
        config: Config,
        snapshot: Snapshot,
        private sleep: (ms: number) => Promise<void>,
        now: () => number,
    ) {
        super(config, snapshot, now);
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
    }

    public async makeOrders(orders: LimitOrder[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.makeOrders(orders);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async amendOrders(amendments: Amendment[]): Promise<(OpenOrder | Error)[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.amendOrders(amendments);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async cancelOrders(orders: OpenOrder[]): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.cancelOrders(orders);
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getBalances(): Promise<Balances> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getBalances();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getPositions(): Promise<Positions> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getPositions();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    public async getOpenOrders(): Promise<OpenOrder[]> {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getOpenOrders();
        } finally {
            await this.sleep(this.config.PING);
        }
    }

    /** @override */
    protected async pushOrderbook(): Promise<void> {
        const orderbook = clone(this.bookManager.getBook());
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }

    /** @override */
    protected async pushUTrades(uTrades: UnidentifiedTrade[]): Promise<void> {
        const trades = clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
    }

    /** @override */
    protected async pushPositionsAndBalances(): Promise<void> {
        this.settle();
        const positions: Positions = clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
        const balances: Balances = clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}

export {
    Texchange,
    Events,
}
