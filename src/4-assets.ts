import { Taken } from './3-taken';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    LONG, SHORT,
    OPEN, CLOSE,
    BID,
    Config,
    OpenOrder,
    min,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './assets-manager';

class ManagingAssets extends Taken {
    private settlementPrice = new Big(0);
    private assets: AssetsManager;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.assets = new AssetsManager(config);
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        if (order.operation === CLOSE && this.enoughPosition(order))
            throw new Error('No enough position to close.');
        this.settle();
        if (!this.enoughReserve(order))
            throw new Error('No enough available balance as margin.');
        // 由于精度问题，开仓成功后也可能 reserve 为负。

        return super.makeLimitOrder(order);
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        const toThaw = this.openOrders.removeOrder(oid);
        this.assets.thaw(toThaw);
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

    private enoughPosition(order: LimitOrder) {
        return order.quantity.lte(new Big(0)
            .plus(this.assets.position[order.side * order.operation])
            .minus(this.assets.frozenPosition[order.side * order.operation]));
    }

    private enoughReserve(order: LimitOrder) {
        return order.operation === OPEN && new Big(0)
            .plus(
                this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).div(this.config.leverage))
            .plus(
                this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).times(this.config.TAKER_FEE))
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
            .lte(this.assets.reserve);
    }

    protected orderTakes(taker: LimitOrder): [
        LimitOrder, RawTrade[], Big, Big,
    ] {
        const [makerOrder, rawTrades, volume, dollarVolume] =
            super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === OPEN) this.assets.openPosition(
            taker.side * taker.operation, volume, dollarVolume, takerFee,
        ); else this.assets.closePosition(
            taker.side * taker.operation, volume, dollarVolume, takerFee,
        );
        return [makerOrder, rawTrades, volume, dollarVolume];
    }

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const [openOrder, toFreeze] = this.openOrders.addOrder({
            ...order,
            id: ++this.orderCount,
        });
        this.assets.freeze(toFreeze);
        return openOrder;
    }

    protected rawTradeTakesOpenOrder(
        rawTrade: RawTrade,
        maker: OpenOrder,
    ): void {
        const volume = min(rawTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        rawTrade.quantity = rawTrade.quantity.minus(volume);
        const toThaw = this.openOrders.takeOrder(maker.id, volume, dollarVolume);
        this.assets.thaw(toThaw);

        const makerFee = dollarVolume.times(this.config.MAKER_FEE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === OPEN) this.assets.openPosition(
            maker.side * maker.operation, volume, dollarVolume, makerFee,
        ); else this.assets.closePosition(
            maker.side * maker.operation, volume, dollarVolume, makerFee,
        );
    }

    private settle(): void {
        const position = { ...this.assets.position };
        for (const length of [LONG, SHORT]) {
            const settlementDollarVolume =
                this.config.calcDollarVolume(
                    this.settlementPrice,
                    position[length],
                ).round(this.config.CURRENCY_DP);
            this.assets.closePosition(
                length,
                position[length],
                settlementDollarVolume,
                new Big(0),
            );
            this.assets.openPosition(
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
