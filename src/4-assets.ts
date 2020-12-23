import { Taken } from './3-taken';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    LONG, SHORT,
    Config,
    DetailedOpenOrder,
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
        if (!order.open && this.enoughPosition(order))
            throw new Error('No enough position to close.');
        this.settle();
        if (!this.enoughReserve(order))
            throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。

        const [makerOrder, rawTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);

        if (rawTrades.length) this.pushRawTrades(rawTrades);
        this.pushOrderbook();
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        const openOrder = this.openOrders.get(oid);
        if (openOrder) {
            this.assetsManager.release(
                openOrder.frozenMargin,
                openOrder.frozenFee,
                openOrder.quantity,
                openOrder,
            );
        }
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

    private enoughPosition(order: LimitOrder) {
        return order.quantity.lte(new Big(0)
            .plus(this.assetsManager.getPosition()[-order.side])
            .minus(this.assetsManager.getFrozenPosition()[-order.side]));
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

    protected orderTakes(taker: LimitOrder): [
        LimitOrder, RawTrade[], Big, Big,
    ] {
        const [makerOrder, rawTrades, volume, dollarVolume] =
            super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.open) this.assetsManager.openPosition(
            taker.side, volume, dollarVolume, takerFee,
        ); else this.assetsManager.closePosition(
            -taker.side, volume, dollarVolume, takerFee,
        );
        return [makerOrder, rawTrades, volume, dollarVolume];
    }

    protected orderMakes(
        order: LimitOrder,
    ): DetailedOpenOrder {
        const openOrder = super.orderMakes(order);
        const dollarVolume = this.config.calcDollarVolume(
            openOrder.price, openOrder.quantity);
        this.assetsManager.freeze(
            dollarVolume.div(this.assetsManager.getLeverage())
                .round(this.config.CURRENCY_DP, RoundingMode.RoundUp),

            dollarVolume.times(this.config.MAKER_FEE)
                .round(this.config.CURRENCY_DP, RoundingMode.RoundUp),
            openOrder.quantity,
            openOrder,
        );
        return openOrder;
    }

    protected rawTradeTakesOpenOrders(_rawTrade: RawTrade) {
        const rawTrade: RawTrade = { ..._rawTrade };
        for (const openOrder of this.openOrders.values())
            if (this.rawTradeShouldTakeOpenOrder(rawTrade, openOrder)) {
                const [volume, dollarVolume] =
                    this.rawTradeTakesOpenOrder(rawTrade, openOrder);

                const makerFee = dollarVolume.times(this.config.MAKER_FEE)
                    .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);

                this.assetsManager.release(
                    dollarVolume.div(this.assetsManager.getLeverage())
                        .round(this.config.CURRENCY_DP),
                    makerFee,
                    volume,
                    openOrder,
                );

                if (openOrder.open) this.assetsManager.openPosition(
                    openOrder.side, volume, dollarVolume, makerFee,
                ); else this.assetsManager.closePosition(
                    -openOrder.side, volume, dollarVolume, makerFee,
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
                new Big(0),
            );
            this.assetsManager.openPosition(
                length,
                position[length],
                settlementDollarVolume,
                new Big(0),
            );
        }
    }
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
