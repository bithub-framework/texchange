import { Taken } from './3-taken';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    LONG, SHORT,
    Config,
    OpenOrder,
    min,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './assets-manager';

class ManagingAssets extends Taken {
    private settlementPrice = new Big(0);
    private assetsManager: AssetsManager;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.assetsManager = new AssetsManager(config);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        const assets = this.assetsManager.getAssets();
        if (
            !order.open &&
            order.quantity.gt(assets.position[-order.side])
        ) throw new Error('No enough position to close.');
        this.settle();
        if (!this.enoughReserve(order))
            throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。

        const [makerOrder, rawTrades, volume, dollarVolume] =
            this.orderTakes(order);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        this.assetsManager.decBalance(takerFee);

        if (order.open)
            this.assetsManager.openPosition(order.side, volume, dollarVolume);
        else
            this.assetsManager.closePosition(-order.side, volume, dollarVolume);
        const openOrder = this.orderMakes(makerOrder);
        this.assetsManager.freeze(openOrder.frozen);

        if (rawTrades.length) this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        const openOrder = this.openOrders.get(oid);
        if (openOrder) this.assetsManager.release(openOrder.frozen);
        await super.cancelOrder(oid);
    }

    public async getAssets(): Promise<Assets> {
        this.settle();
        return this.assetsManager.getAssets();
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

    private enoughReserve(order: LimitOrder) {
        return order.open && new Big(0)
            .plus(
                this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).div(this.assetsManager.getLeverage()))
            .plus(
                this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).times(this.config.TAKER_FEE))
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
            .lte(this.assetsManager.getReserve());
    }

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const dollarVolume = this.config
            .calcDollarVolume(order.price, order.quantity);
        const openOrder: OpenOrder = {
            ...order,
            id: ++this.orderCount,
            frozen: new Big(0)
                .plus(dollarVolume.div(this.assetsManager.getLeverage()))
                .plus(dollarVolume.times(this.config.MAKER_FEE))
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
                        .plus(dollarVolume.div(this.assetsManager.getLeverage()))
                        .plus(dollarVolume.times(this.config.MAKER_FEE))
                        .round(this.config.CURRENCY_DP),
                    openOrder.frozen);
                openOrder.frozen = openOrder.frozen.minus(released);
                this.assetsManager.release(released);
                this.assetsManager.decBalance(
                    dollarVolume.times(this.config.MAKER_FEE)
                        .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
                );
                if (openOrder.open) this.assetsManager.openPosition(
                    openOrder.side, volume, dollarVolume,
                ); else this.assetsManager.closePosition(
                    -openOrder.side, volume, dollarVolume,
                );
            }
    }

    private settle(): void {
        const position = { ...this.assetsManager.getPosition() };
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume =
                this.config.calcDollarVolume(
                    this.settlementPrice,
                    position[length],
                ).round(this.config.CURRENCY_DP);
            this.assetsManager.closePosition(
                length,
                position[length],
                settlementDollarVolume,
            );
            this.assetsManager.openPosition(
                length,
                position[length],
                settlementDollarVolume,
            );
        }
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
