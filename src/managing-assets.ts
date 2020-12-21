import { MakingOrder } from './making-order';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    LONG, SHORT,
    Config,
    OpenOrder,
    round,
    floor,
    ceil,
    Length,
} from './interfaces';
import {
    EPSILON,
    PRICE_PRECISION,
    QUANTITY_PRECISION,
    DOLLAR_PRECISION,
} from './config';
import { clone } from 'ramda';

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
        length: Length,
        volume: number,
        dollarVolume: number
    ): void {
        this.assets.position[length] += volume;
        this.assets.position[length] = round(this.assets.position[length], QUANTITY_PRECISION);

        this.assets.cost[length] += dollarVolume;
        this.assets.cost[length] = round(this.assets.cost[length], DOLLAR_PRECISION);
    }

    protected closePosition(
        length: Length,
        volume: number,
        dollarVolume: number
    ): void {
        const costPrice
            = this.assets.cost[length] / this.assets.position[length];
        const cost = volume > this.assets.position[length] - EPSILON
            ? this.assets.cost[length]
            : floor(
                // non precision reason
                volume * costPrice,
                DOLLAR_PRECISION
            );
        const realizedProfit = length === LONG
            ? dollarVolume - cost
            : cost - dollarVolume;

        this.assets.balance += realizedProfit;
        this.assets.balance = round(this.assets.balance, DOLLAR_PRECISION);

        this.assets.position[length] -= volume;
        this.assets.position[length] = round(this.assets.position[length], QUANTITY_PRECISION);

        this.assets.cost[length] -= cost;
        this.assets.cost[length] = round(this.assets.cost[length], DOLLAR_PRECISION);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        if (
            !order.open &&
            order.quantity > this.assets.position[1 - order.side] + EPSILON
        ) throw new Error('No enough position to close.');
        this.settle();
        if (
            order.open &&
            ceil(
                // non precision reason
                order.price * order.quantity / this.assets.leverage,
                DOLLAR_PRECISION,
            ) +
            ceil(
                // non precision reason
                order.price * order.quantity * this.config.TAKER_FEE,
                DOLLAR_PRECISION,
            )
            < this.assets.reserve + EPSILON
        ) throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。

        const [
            makerOrder,
            rawTrades,
            volume,
            dollarVolume,
        ] = this.orderTakes(order);
        const takerFee = ceil(
            // non precision reason
            dollarVolume * this.config.TAKER_FEE,
            DOLLAR_PRECISION,
        );

        this.assets.balance -= takerFee;
        this.assets.balance = round(this.assets.balance, DOLLAR_PRECISION);

        if (order.open)
            this.openPosition(<number>order.side, volume, dollarVolume);
        else
            this.closePosition(1 - order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        if (this.openOrders.has(openOrder.id)) {
            this.assets.frozen += ceil(
                // non precision reason
                openOrder.price * openOrder.quantity / this.assets.leverage,
                DOLLAR_PRECISION,
            ) + ceil(
                // non precision reason
                makerOrder.price * makerOrder.quantity * this.config.MAKER_FEE,
                DOLLAR_PRECISION,
            );
            this.assets.frozen = round(this.assets.frozen, DOLLAR_PRECISION);
        }
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        let openOrder: OpenOrder | undefined;
        if (openOrder = this.openOrders.get(oid)) {
            this.assets.frozen -= openOrder.frozen;
            this.assets.frozen = round(this.assets.frozen, DOLLAR_PRECISION);
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
                    // non precision reason
                    this.settlementPrice * .9 + rawTrade.price + .1,
                    PRICE_PRECISION,
                );
            this.rawTradeTakesOpenOrders(rawTrade);
        }
        this.pushRawTrades(rawTrades);
    }

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const openOrder: OpenOrder = {
            ...order,
            id: ++this.orderCount,
            frozen: ceil(
                // non precision reason
                order.price * order.quantity / this.assets.leverage,
                DOLLAR_PRECISION,
            ) + ceil(
                // non precision reason
                order.price * order.quantity * this.config.MAKER_FEE,
                DOLLAR_PRECISION,
            ),
        };
        if (openOrder.quantity > EPSILON)
            this.openOrders.set(openOrder.id, openOrder);
        return openOrder;
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const openOrder of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, openOrder)) {
                const [
                    volume, dollarVolume,
                ] = this.rawTradeTakesOpenOrder(rawTrade, openOrder);
                const released = this.openOrders.has(openOrder.id)
                    ? floor(
                        // non precision reason
                        dollarVolume / this.assets.leverage +
                        dollarVolume * this.config.MAKER_FEE,
                        DOLLAR_PRECISION,
                    ) : openOrder.frozen;

                openOrder.frozen -= released;
                openOrder.frozen = round(openOrder.frozen, DOLLAR_PRECISION);

                this.assets.frozen -= released;
                this.assets.frozen = round(this.assets.frozen, DOLLAR_PRECISION);

                this.assets.balance = floor(
                    // non precision reason
                    this.assets.balance -
                    dollarVolume * this.config.MAKER_FEE,
                    DOLLAR_PRECISION,
                );
                if (openOrder.open)
                    this.openPosition(<number>openOrder.side, volume, dollarVolume);
                else
                    this.closePosition(1 - openOrder.side, volume, dollarVolume);
                this.calcMargin();
            }
    }

    private settle(): void {
        const price = this.settlementPrice;
        const assets = clone(this.assets);
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume =
                (length === LONG ? floor : ceil)(
                    // non precision reason
                    price * assets.position[length],
                    DOLLAR_PRECISION,
                );
            this.closePosition(
                length,
                assets.position[length],
                settlementDollarVolume,
            );
            this.openPosition(
                length,
                assets.position[length],
                settlementDollarVolume,
            );
        }
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
        this.assets.margin = ceil(
            // non precision reason
            (cost[LONG] + cost[SHORT]) / leverage,
            DOLLAR_PRECISION,
        );
        this.assets.reserve = balance - margin - frozen;
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
