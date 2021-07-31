import {
    Texchange as Parent,
    Events,
} from './3-taken';
import {
    LimitOrder,
    UnidentifiedTrade,
    Operation,
    Config,
    OpenOrder,
    OpenMaker,
    Snapshot,
    Side,
    min,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './manager-assets';
import assert = require('assert');

abstract class Texchange extends Parent {
    protected assets: AssetsManager;

    protected abstract pushPositionsAndBalances(): Promise<void>;
    protected abstract settle(): void;


    constructor(
        config: Config,
        snapshot: Snapshot,
        now: () => number,
    ) {
        super(config, snapshot, now);
        this.assets = new AssetsManager(
            config,
            snapshot,
            () => this.settlementPrice,
            () => this.latestPrice,
        );
    }

    /** @override */
    protected validateOrder(order: OpenOrder) {
        this.formatCorrect(order);
        this.enoughPosition(order);
        if (this.config.ONE_WAY_POSITION) this.singleLength(order);
        // 暂只支持实时结算
        this.settle();
        this.enoughAvailable(order);
    }

    private enoughPosition(order: OpenOrder) {
        if (order.operation === Operation.CLOSE)
            assert(
                order.unfilled.lte(new Big(0)
                    .plus(this.assets.position[order.side * order.operation])
                    .minus(this.assets.frozenPosition[order.side * order.operation])
                ),
            );
    }

    private singleLength(order: LimitOrder) {
        assert(this.assets.position[-order.length].eq(0));
    }

    private enoughAvailable(order: OpenOrder) {
        if (order.operation === Operation.OPEN)
            assert(new Big(0)
                .plus(this.config.calcInitialMargin(
                    this.config,
                    order,
                    this.settlementPrice,
                    this.latestPrice,
                )).plus(
                    this.config.calcDollarVolume(
                        order.price, order.unfilled,
                    ).times(this.config.TAKER_FEE_RATE),
                ).round(this.config.CURRENCY_DP)
                .lte(this.assets.available),
            );
    }

    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder {
        const uTrades = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
            this.pushOrderbook().catch(err => void this.emit('error', err));
            this.pushPositionsAndBalances().catch(err => void this.emit('error', err));
        }
        return order;
    }

    /** @override */
    protected orderTakes(taker: OpenOrder): UnidentifiedTrade[] {
        const uTrades: UnidentifiedTrade[] = [];
        let volume = new Big(0);
        let dollarVolume = new Big(0);
        const orderbook = this.bookManager.getBook();
        for (const maker of orderbook[-taker.side])
            if (
                (
                    taker.side === Side.BID && taker.price.gte(maker.price) ||
                    taker.side === Side.ASK && taker.price.lte(maker.price)
                ) && taker.unfilled.gt(0)
            ) {
                const quantity = min(taker.unfilled, maker.quantity);
                uTrades.push({
                    side: taker.side,
                    price: maker.price,
                    quantity,
                    time: this.now(),
                });
                this.bookManager.decQuantity(maker.side, maker.price, quantity);
                taker.filled = taker.filled.plus(quantity);
                taker.unfilled = taker.unfilled.minus(quantity);
                volume = volume.plus(quantity);
                dollarVolume = dollarVolume
                    .plus(this.config.calcDollarVolume(maker.price, quantity))
                    .round(this.config.CURRENCY_DP);
            }
        this.bookManager.apply();

        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === Operation.OPEN) {
            this.assets.openPosition(
                taker.length, volume, dollarVolume, takerFee
            );
            this.assets.incMargin(taker.price, volume);
        } else {
            this.assets.closePosition(
                taker.length, volume, dollarVolume, takerFee,
            );
            this.assets.decMargin(volume);
        }
        return uTrades;
    }

    /** @override */
    protected orderMakes(
        openOrder: OpenOrder,
    ): void {
        const openMaker: OpenMaker = {
            price: openOrder.price,
            quantity: openOrder.quantity,
            side: openOrder.side,
            length: openOrder.length,
            operation: openOrder.operation,
            filled: openOrder.filled,
            unfilled: openOrder.unfilled,
            id: openOrder.id,
            behind: new Big(0),
        };
        const orderbook = this.bookManager.getBook();
        for (const maker of orderbook[openOrder.side])
            if (maker.price.eq(openOrder.price))
                openMaker.behind = openMaker.behind.plus(maker.quantity);
        const toFreeze = this.openMakers.addOrder(openMaker);
        this.assets.freeze(toFreeze);
    }
}

export {
    Texchange,
    Events,
}
