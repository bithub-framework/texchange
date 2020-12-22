import { MakingOrder } from './making-order';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    LONG, SHORT,
    Config,
    OpenOrder,
    Length,
    min,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';

class ManagingAssets extends MakingOrder {
    private settlementPrice = new Big(0);
    private assets: Assets;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.assets = config.initialAssets;
    }

    protected openPosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
    ): void {
        this.assets.position[length] = this.assets.position[length].plus(volume);
        this.assets.cost[length] = this.assets.cost[length].plus(dollarVolume);
    }

    protected closePosition(
        length: Length,
        volume: Big,
        dollarVolume: Big,
    ): void {
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            : this.config.calcDollarVolume(
                this.assets.cost[length].div(this.assets.position[length]),
                volume,
            ).round(this.config.CURRENCY_DP);
        const profit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.assets.balance = this.assets.balance.plus(profit);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        if (
            !order.open &&
            order.quantity.gt(this.assets.position[-order.side])
        ) throw new Error('No enough position to close.');
        this.settle();
        if (
            order.open && new Big(0)
                .plus(
                    this.config.calcDollarVolume(
                        order.price, order.quantity,
                    ).div(this.assets.leverage))
                .plus(
                    this.config.calcDollarVolume(
                        order.price, order.quantity,
                    ).times(this.config.TAKER_FEE))
                .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
                .gt(this.assets.reserve)
        ) throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。

        const [
            makerOrder,
            rawTrades,
            volume,
            dollarVolume,
        ] = this.orderTakes(order);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        this.assets.balance = this.assets.balance.minus(takerFee);

        if (order.open)
            this.openPosition(<number>order.side, volume, dollarVolume);
        else
            this.closePosition(-order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        this.assets.frozen = this.assets.frozen
            .plus(openOrder.frozen);

        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        const openOrder = this.openOrders.get(oid);
        if (openOrder) {
            this.assets.frozen = this.assets.frozen
                .minus(openOrder.frozen);
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
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(rawTrade.price.times(.1))
                .round(this.config.PRICE_DP);
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
            frozen: new Big(0)
                .plus(
                    this.config.calcDollarVolume(
                        order.price, order.quantity,
                    ).div(this.assets.leverage))
                .plus(
                    this.config.calcDollarVolume(
                        order.price, order.quantity,
                    ).times(this.config.MAKER_FEE))
                .round(this.config.CURRENCY_DP, RoundingMode.RoundUp),
        };
        if (openOrder.quantity.gt(0))
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
                const released = min(
                    new Big(0)
                        .plus(dollarVolume.div(this.assets.leverage))
                        .plus(dollarVolume.times(this.config.MAKER_FEE))
                        .round(this.config.CURRENCY_DP),
                    openOrder.frozen);
                openOrder.frozen = openOrder.frozen.minus(released);
                this.assets.frozen = this.assets.frozen.minus(released);
                this.assets.balance = this.assets.balance
                    .minus(dollarVolume.times(this.config.MAKER_FEE))
                    .round(this.config.CURRENCY_DP, RoundingMode.RoundDown);
                if (openOrder.open)
                    this.openPosition(<number>openOrder.side, volume, dollarVolume);
                else
                    this.closePosition(-openOrder.side, volume, dollarVolume);
                this.calcMargin();
            }
    }

    private settle(): void {
        const position = { ...this.assets.position };
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume =
                this.config.calcDollarVolume(
                    this.settlementPrice,
                    position[length],
                ).round(this.config.CURRENCY_DP);
            this.closePosition(
                length,
                position[length],
                settlementDollarVolume,
            );
            this.openPosition(
                length,
                position[length],
                settlementDollarVolume,
            );
        }
        this.calcMargin();
    }

    private calcMargin() {
        this.assets.margin = new Big(0)
            .plus(this.assets.cost[LONG])
            .plus(this.assets.cost[SHORT])
            .div(this.assets.leverage)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        this.assets.reserve = this.assets.balance
            .minus(this.assets.margin)
            .minus(this.assets.frozen);
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
