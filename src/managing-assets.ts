import { MakingOrder } from './making-order';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    Side, ASK,
    LONG, SHORT,
    Config,
    OpenOrder,
    round,
    trunc,
} from './interfaces';
import {
    EPSILON,
    PRICE_PRECISION,
    QUANTITY_PRECISION,
    COST_PRECISION,
    BALANCE_PRECISION,
} from './config';

class ManagingAssets extends MakingOrder {
    private settlementPrice = 0;
    private assets: Assets;

    constructor(
        protected config: Config,
        now: () => number,
    ) {
        super(now);
        this.assets = config.initialAssets;
    }

    protected openPosition(
        side: Side,
        volume: number,
        dollarVolume: number
    ): void {
        this.assets.position[side] = round(
            this.assets.position[side] + volume,
            QUANTITY_PRECISION,
        );
        this.assets.cost[side] = round(
            this.assets.cost[side] + dollarVolume,
            COST_PRECISION,
        );
    }

    protected closePosition(
        side: Side,
        volume: number,
        dollarVolume: number
    ): void {
        const costPrice = trunc(
            this.assets.cost[1 - side] / this.assets.position[1 - side],
            PRICE_PRECISION,
        );
        const cost = volume > this.assets.position[1 - side] - EPSILON
            ? this.assets.cost[1 - side]
            : volume * costPrice;
        const realizedProfit = side === ASK
            ? dollarVolume - cost
            : cost - dollarVolume;
        this.assets.balance = round(
            this.assets.balance + realizedProfit,
            BALANCE_PRECISION,
        );
        this.assets.position[1 - side] = round(
            this.assets.position[1 - side] - volume,
            QUANTITY_PRECISION,
        );
        this.assets.cost[1 - side] = round(
            this.assets.cost[1 - side] - cost,
            COST_PRECISION,
        );
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        if (
            !order.open &&
            order.quantity > this.assets.position[1 - order.side] + EPSILON
        ) throw new Error('No enough position to close.');
        this.settle();
        if (
            order.open &&
            order.price * order.quantity / this.assets.leverage +
            order.price * order.quantity * this.config.TAKER_FEE
            < this.assets.reserve - EPSILON
        ) throw new Error('No enough available balance as margin.');

        const [
            makerOrder,
            rawTrades,
            volume,
            dollarVolume,
        ] = this.orderTakes(order);
        this.assets.balance = round(
            this.assets.balance - dollarVolume * this.config.TAKER_FEE,
            BALANCE_PRECISION,
        );
        if (order.open)
            this.openPosition(order.side, volume, dollarVolume);
        else
            this.closePosition(order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        if (this.openOrders.has(openOrder.id))
            this.assets.frozen = round(
                this.assets.frozen +
                openOrder.price * openOrder.quantity / this.assets.leverage +
                openOrder.price * openOrder.quantity * this.config.MAKER_FEE,
                BALANCE_PRECISION,
            );
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        let openOrder: OpenOrder | undefined;
        if (openOrder = this.openOrders.get(oid)) {
            this.assets.frozen = round(
                this.assets.frozen -
                openOrder.price * openOrder.quantity / this.assets.leverage +
                openOrder.price * openOrder.quantity * this.config.MAKER_FEE,
                BALANCE_PRECISION,
            );
        }
        this.calcMargin();
        await super.cancelOrder(oid);
    }

    public async getAssets(): Promise<Assets> {
        this.settle();
        return this.assets;
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        for (let rawTrade of rawTrades) {
            this.settlementPrice
                = round(
                    this.settlementPrice * .9 + rawTrade.price + .1,
                    PRICE_PRECISION,
                );
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const order of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, order)) {
                const [
                    volume, dollarVolume,
                ] = this.rawTradeTakesOpenOrder(rawTrade, order);
                this.assets.frozen = round(
                    this.assets.frozen -
                    dollarVolume / this.assets.leverage +
                    dollarVolume * this.config.MAKER_FEE,
                    BALANCE_PRECISION,
                );
                this.assets.balance = round(
                    this.assets.balance -
                    dollarVolume * this.config.MAKER_FEE,
                    BALANCE_PRECISION,
                );
                if (order.open)
                    this.openPosition(order.side, volume, dollarVolume);
                else
                    this.closePosition(order.side, volume, dollarVolume);
                this.calcMargin();
            }
    }

    private settle(): void {
        const price = this.settlementPrice;
        const {
            position,
            cost,
        } = this.assets;
        const unrealizedProfit =
            (price * position[LONG] - cost[LONG]) +
            (cost[SHORT] - price * position[SHORT]);
        this.assets.balance = round(
            this.assets.balance + unrealizedProfit,
            BALANCE_PRECISION,
        );
        this.assets.cost[LONG] = price * position[LONG];
        this.assets.cost[SHORT] = price * position[SHORT];
        this.calcMargin();
    }

    private calcMargin() {
        const {
            cost,
            leverage,
            balance,
            margin,
            frozen,
        } = this.assets;
        this.assets.margin = (cost[LONG] + cost[SHORT]) / leverage;
        this.assets.reserve = balance - margin - frozen;
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
