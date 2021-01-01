import { Taken } from './3-taken';
import {
    Assets,
    LimitOrder,
    OrderId,
    UnidentifiedTrade,
    LONG, SHORT,
    OPEN, CLOSE,
    Config,
    OpenOrder,
    min,
    clone,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './manager-assets';
import assert from 'assert';

class ManagingAssets extends Taken {
    private assets: AssetsManager;

    constructor(
        config: Config,
        now: () => number,
    ) {
        super(config, now);
        this.assets = new AssetsManager(
            config,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
    }

    public async makeLimitOrder(order: LimitOrder): Promise<OrderId> {
        this.validateOrder(order);
        this.enoughPosition(order);
        this.settle();
        this.enoughReserve(order);

        const [makerOrder, uTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (uTrades.length) {
            this.pushNoidTrades(uTrades);
            this.pushOrderbook();
        }
        return openOrder.id;
    }

    public async cancelOrder(oid: OrderId): Promise<void> {
        const toThaw = this.openOrders.removeOrder(oid);
        this.assets.thaw(toThaw);
    }

    public async getAssets(): Promise<Assets> {
        this.settle();
        this.assets.time = this.now();
        return this.assets;
    }

    public updateTrades(uTrades: UnidentifiedTrade[]): void {
        super.updateTrades(uTrades);
        for (let uTrade of uTrades) {
            this.settlementPrice = new Big(0)
                .plus(this.settlementPrice.times(.9))
                .plus(uTrade.price.times(.1))
                .round(this.config.PRICE_DP);
            this.latestPrice = uTrade.price;
        }
    }

    private enoughPosition(order: LimitOrder) {
        assert(
            order.operation === OPEN ||
            order.quantity.lte(new Big(0)
                .plus(this.assets.position[order.side * order.operation])
                .minus(this.assets.frozenPosition[order.side * order.operation])));
    }

    private enoughReserve(order: LimitOrder) {
        assert(
            order.operation === CLOSE || new Big(0)
                .plus(this.config.calcInitialMargin(
                    this.config,
                    order,
                    this.settlementPrice,
                    this.latestPrice,
                )
                ).plus(this.config.calcDollarVolume(
                    order.price, order.quantity,
                ).times(this.config.TAKER_FEE_RATE))
                .round(this.config.CURRENCY_DP, RoundingMode.RoundUp)
                .lte(this.assets.reserve));
    }

    protected orderTakes(taker: LimitOrder): [
        LimitOrder, UnidentifiedTrade[], Big, Big,
    ] {
        const [makerOrder, uTrades, volume, dollarVolume] =
            super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === OPEN) {
            this.assets.openPosition(
                taker.length, volume, dollarVolume, takerFee);
            this.assets.incMargin(
                taker.price,
                volume,
            );
        } else {
            this.assets.closePosition(
                taker.length, volume, dollarVolume, takerFee,
            );
            this.assets.decMargin(volume);
        }
        return [makerOrder, uTrades, volume, dollarVolume];
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

    protected uTradeTakesOpenOrder(
        uTrade: UnidentifiedTrade,
        maker: OpenOrder,
    ): void {
        const volume = min(uTrade.quantity, maker.quantity);
        const dollarVolume = this.config.calcDollarVolume(maker.price, volume)
            .round(this.config.CURRENCY_DP);
        uTrade.quantity = uTrade.quantity.minus(volume);
        const toThaw = this.openOrders.takeOrder(maker.id, volume, dollarVolume);
        this.assets.thaw(toThaw);

        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === OPEN) {
            this.assets.openPosition(
                maker.length, volume, dollarVolume, makerFee,
            );
            this.assets.incMargin(
                maker.price,
                volume,
            );
        } else {
            this.assets.closePosition(
                maker.length, volume, dollarVolume, makerFee,
            );
            this.assets.decMargin(volume);
        }
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
