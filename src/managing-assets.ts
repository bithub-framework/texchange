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
} from './interfaces';
import {
    PRICE_DP,
    DOLLAR_DP,
} from './config';
import { clone } from 'ramda';
import {
    Big,
    RoundingMode,
} from 'big.js';

class ManagingAssets extends MakingOrder {
    private settlementPrice = new Big(0);
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
        const costPrice
            = this.assets.cost[length].div(this.assets.position[length]);
        const cost = volume.eq(this.assets.position[length])
            ? this.assets.cost[length]
            // TODO
            : volume.times(costPrice).round(DOLLAR_DP);
        const realizedProfit = length === LONG
            ? dollarVolume.minus(cost)
            : cost.minus(dollarVolume);
        this.assets.balance = this.assets.balance.plus(realizedProfit);
        this.assets.position[length] = this.assets.position[length].minus(volume);
        this.assets.cost[length] = this.assets.cost[length].minus(cost);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        if (
            !order.open &&
            order.quantity.gt(this.assets.position[1 - order.side])
        ) throw new Error('No enough position to close.');
        this.settle();
        if (
            order.open &&
            order.price.times(order.quantity).div(this.assets.leverage)
                .round(DOLLAR_DP, RoundingMode.RoundUp).plus(
                    order.price.times(order.quantity).times(this.config.TAKER_FEE)
                        .round(DOLLAR_DP, RoundingMode.RoundUp)
                ).lt(this.assets.reserve)
        ) throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。

        const [
            makerOrder,
            rawTrades,
            volume,
            dollarVolume,
        ] = this.orderTakes(order);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(DOLLAR_DP, RoundingMode.RoundUp);
        this.assets.balance = this.assets.balance.minus(takerFee);

        if (order.open)
            this.openPosition(<number>order.side, volume, dollarVolume);
        else
            this.closePosition(1 - order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        if (this.openOrders.has(openOrder.id)) {
            this.assets.frozen = this.assets.frozen
                .plus(openOrder.price.times(openOrder.quantity).div(this.assets.leverage))
                .round(DOLLAR_DP, RoundingMode.RoundUp)
                .plus(openOrder.price.times(openOrder.quantity).times(this.config.MAKER_FEE))
                .round(DOLLAR_DP, RoundingMode.RoundUp);
        }
        this.calcMargin();
        this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        let openOrder: OpenOrder | undefined;
        if (openOrder = this.openOrders.get(oid)) {
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
                .round(PRICE_DP);
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
                .plus(order.price.times(order.quantity).div(this.assets.leverage))
                .round(DOLLAR_DP, RoundingMode.RoundUp)
                .plus(order.price.times(order.quantity).times(this.config.MAKER_FEE))
                .round(DOLLAR_DP, RoundingMode.RoundUp),
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
                const released = this.openOrders.has(openOrder.id)
                    ? new Big(0)
                        .plus(dollarVolume.div(this.assets.leverage))
                        .plus(dollarVolume.times(this.config.MAKER_FEE))
                        .round(DOLLAR_DP, RoundingMode.RoundDown)
                    : openOrder.frozen;
                openOrder.frozen = openOrder.frozen
                    .minus(released);
                this.assets.frozen = this.assets.frozen
                    .minus(released);
                this.assets.balance = this.assets.balance
                    .minus(dollarVolume.times(this.config.MAKER_FEE))
                    .round(DOLLAR_DP, RoundingMode.RoundDown);
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
            const settlementDollarVolume = new Big(0)
                .plus(price.times(assets.position[length]))
                .round(
                    DOLLAR_DP,
                    length === LONG ? RoundingMode.RoundDown : RoundingMode.RoundUp
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
        this.assets.margin = new Big(0)
            .plus(cost[LONG])
            .plus(cost[SHORT])
            .div(leverage)
            .round(DOLLAR_DP, RoundingMode.RoundUp);
        this.assets.reserve = balance.minus(margin).minus(frozen);
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
