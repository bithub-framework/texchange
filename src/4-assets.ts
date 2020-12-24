import { Taken } from './3-taken';
import {
    Assets,
    LimitOrder,
    OrderId,
    RawTrade,
    LONG, SHORT,
    OPEN, CLOSE,
    Config,
    OpenOrder,
    min, clone,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './assets-manager';
import assert from 'assert';

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
        assert(this.enoughPosition(order));
        this.settle();
        assert(this.enoughReserve(order));

        return super.makeLimitOrder(order);
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        const toThaw = this.openOrders.removeOrder(oid);
        this.assets.thaw(toThaw);
    }

    public async getAssets(): Promise<Assets> {
        console.log(1);
        this.settle();
        console.log(2);
        return this.assets;
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        super.updateTrades(rawTrades);
        for (let rawTrade of rawTrades)
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(rawTrade.price.times(.1))
                .round(this.config.PRICE_DP);
    }

    private enoughPosition(order: LimitOrder) {
        return order.operation === OPEN || order.quantity.lte(new Big(0)
            .plus(this.assets.position[order.side * order.operation])
            .minus(this.assets.frozenPosition[order.side * order.operation]));
    }

    private enoughReserve(order: LimitOrder) {
        return order.operation === CLOSE || new Big(0)
            .plus(
                this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).div(this.config.leverage))
            .plus(
                this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).times(this.config.TAKER_FEE_RATE))
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
            .lte(this.assets.reserve);
    }

    protected orderTakes(taker: LimitOrder): [
        LimitOrder, RawTrade[], Big, Big,
    ] {
        const [makerOrder, rawTrades, volume, dollarVolume] =
            super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === OPEN) this.assets.openPosition(
            taker.length, volume, dollarVolume, takerFee,
        ); else this.assets.closePosition(
            taker.length, volume, dollarVolume, takerFee,
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

        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === OPEN) this.assets.openPosition(
            maker.length, volume, dollarVolume, makerFee,
        ); else this.assets.closePosition(
            maker.length, volume, dollarVolume, makerFee,
        );
    }

    private settle(): void {
        const position = clone(this.assets.position);
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
