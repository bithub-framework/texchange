import { Taken } from './3-taken';
import {
    LimitOrder,
    OrderId,
    UnidentifiedTrade,
    LONG, SHORT,
    OPEN, CLOSE,
    Config,
    OpenOrder,
    clone,
    Positions,
    Balances,
    Orderbook,
    Trade,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './manager-assets';
import assert from 'assert';
import { EventEmitter } from 'events';

abstract class ManagingAssets extends Taken {
    protected assets: AssetsManager;

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

    protected makeLimitOrderSync(order: LimitOrder): OrderId {
        this.validateOrder(order);
        if (this.config.UNIDIRECTIONAL) this.onlyOneOpenOrder();
        this.enoughPosition(order);
        if (this.config.UNIDIRECTIONAL) this.singleLength(order);
        this.settle();
        this.enoughReserve(order);

        const [makerOrder, uTrades] = this.orderTakes(order);
        const openOrder = this.orderMakes(makerOrder);
        if (uTrades.length) {
            this.pushUTrades(uTrades)
                .catch(err => void this.emit('error', err));
            this.pushOrderbook()
                .catch(err => void this.emit('error', err));
            this.pushPositionsAndBalances()
                .catch(err => void this.emit('error', err));
        }
        return openOrder.id;
    }

    protected cancelOrderSync(oid: OrderId): OpenOrder | null {
        const openOrder = this.openOrders.get(oid) || null;
        const toThaw = this.openOrders.removeOrder(oid);
        this.assets.thaw(toThaw);
        return clone(openOrder);
    }

    protected getPositionsSync(): Positions {
        this.settle();
        return clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
    }

    protected getBalancesSync(): Balances {
        this.settle();
        return clone({
            balance: this.assets.balance,
            reserve: this.assets.reserve,
            time: this.now(),
        });
    }

    private enoughPosition(order: LimitOrder) {
        if (order.operation === CLOSE)
            assert(
                order.quantity.lte(new Big(0)
                    .plus(this.assets.position[order.side * order.operation])
                    .minus(this.assets.frozenPosition[order.side * order.operation])
                ),
            );
    }

    private singleLength(order: LimitOrder) {
        assert(this.assets.position[-order.length].eq(0));
    }

    private enoughReserve(order: LimitOrder) {
        if (order.operation === OPEN)
            assert(new Big(0)
                .plus(this.config.calcInitialMargin(
                    this.config,
                    order,
                    this.settlementPrice,
                    this.latestPrice,
                )).plus(
                    this.config.calcDollarVolume(
                        order.price, order.quantity,
                    ).times(this.config.TAKER_FEE_RATE),
                ).round(this.config.CURRENCY_DP)
                .lte(this.assets.reserve),
            );
    }

    protected orderTakes(taker: LimitOrder) {
        const [makerOrder, uTrades, volume, dollarVolume] =
            super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (taker.operation === OPEN) {
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
        return [makerOrder, uTrades, volume, dollarVolume] as const;
    }

    protected async pushPositionsAndBalances(): Promise<void> {
        this.settle();
        const positions: Positions = {
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        };
        const balances: Balances = {
            balance: this.assets.balance,
            reserve: this.assets.reserve,
            time: this.now(),
        };
        this.emit('positions', positions);
        this.emit('balances', balances);
    }

    protected orderMakes(
        order: LimitOrder,
    ): OpenOrder {
        const openOrder: OpenOrder = {
            ...order,
            id: ++this.orderCount,
        };
        const toFreeze = this.openOrders.addOrder(openOrder);
        this.assets.freeze(toFreeze);
        return openOrder;
    }

    protected uTradeTakesOpenOrder(
        uTrade: UnidentifiedTrade,
        maker: OpenOrder,
    ) {
        const [volume, dollarVolume, toThaw] = super.uTradeTakesOpenOrder(uTrade, maker);
        this.assets.thaw(toThaw);

        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === OPEN) {
            this.assets.openPosition(
                maker.length, volume, dollarVolume, makerFee,
            );
            this.assets.incMargin(maker.price, volume);
        } else {
            this.assets.closePosition(
                maker.length, volume, dollarVolume, makerFee,
            );
            this.assets.decMargin(volume);
        }
        return [volume, dollarVolume, toThaw] as const;
    }

    protected settle(): void {
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

    public updateTrades(uTrades: UnidentifiedTrade[]) {
        const totalVolume = super.updateTrades(uTrades);
        if (totalVolume.gt(0))
            this.pushPositionsAndBalances()
                .catch(err => void this.emit('error', err));
        return totalVolume;
    }
}

interface ManagingAssets extends EventEmitter {
    emit(event: 'positions', positions: Positions): boolean;
    emit(event: 'balances', balances: Balances): boolean;
    on(event: 'positions', listener: (positions: Positions) => void): this;
    on(event: 'balances', listener: (balances: Balances) => void): this;
    off(event: 'positions', listener: (positions: Positions) => void): this;
    off(event: 'balances', listener: (balances: Balances) => void): this;
    once(event: 'positions', listener: (positions: Positions) => void): this;
    once(event: 'balances', listener: (balances: Balances) => void): this;

    // extended from Pushing
    emit(event: 'orderbook', orderbook: Orderbook): boolean;
    emit(event: 'trades', trades: Trade[]): boolean;
    emit(event: 'error', err: Error): boolean;
    on(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    on(event: 'trades', listener: (trades: Trade[]) => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    off(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    off(event: 'trades', listener: (trades: Trade[]) => void): this;
    off(event: 'error', listener: (err: Error) => void): this;
    once(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
    once(event: 'trades', listener: (trades: Trade[]) => void): this;
    once(event: 'error', listener: (err: Error) => void): this;
}

export {
    ManagingAssets as default,
    ManagingAssets,
}
