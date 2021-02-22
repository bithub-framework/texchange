import { Taken, TakenEvents } from './3-taken';
import {
    LimitOrder,
    UnidentifiedTrade,
    Operation, Length,
    Config,
    OpenOrder,
    clone,
    Positions,
    Balances,
    OpenMaker,
    Snapshot,
} from './interfaces';
import Big from 'big.js';
import { RoundingMode } from 'big.js';
import { AssetsManager } from './manager-assets';
import { Frozen } from './manager-open-makers';
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

    /** @override */
    protected makeOpenOrder(order: OpenOrder): OpenOrder {
        this.validateOrder(order);
        this.enoughPosition(order);
        if (this.config.ONE_WAY_POSITION) this.singleLength(order);
        this.settle();
        this.enoughReserve(order);
        const [uTrades] = this.orderTakes(order);
        this.orderMakes(order);
        if (uTrades.length) {
            this.pushUTrades(uTrades).catch(err => void this.emit('error', err));
            this.pushOrderbook().catch(err => void this.emit('error', err));
            this.pushPositionsAndBalances().catch(err => void this.emit('error', err));
        }
        return order;
    }

    /** @override */
    protected cancelOrderSync(order: OpenOrder): OpenOrder {
        const filled = this.openMakers.get(order.id)?.filled || order.quantity;
        const toThaw = this.openMakers.removeOrder(order.id);
        this.assets.thaw(toThaw);
        return {
            ...order,
            filled,
            unfilled: order.quantity.minus(filled),
        };
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

    private enoughPosition(order: OpenOrder) {
        if (order.operation === Operation.CLOSE)
            assert(
                order.unfilled.lte(new Big(0)
                    .plus(this.assets.position[Length(order.side, order.operation)])
                    .minus(this.assets.frozenPosition[Length(order.side, order.operation)])
                ),
            );
    }

    private singleLength(order: LimitOrder) {
        assert(this.assets.position[Length(order.length)].eq(0));
    }

    private enoughReserve(order: OpenOrder) {
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
                .lte(this.assets.reserve),
            );
    }

    protected orderTakes(taker: OpenOrder) {
        const [uTrades, volume, dollarVolume] = super.orderTakes(taker);
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
        return [uTrades, volume, dollarVolume] as const;
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
        openOrder: OpenOrder,
    ) {
        const toFreeze = super.orderMakes(openOrder);
        this.assets.freeze(toFreeze);
        return toFreeze;
    }

    protected uTradeTakesOpenMaker(
        uTrade: UnidentifiedTrade,
        maker: OpenMaker,
    ): [Big, Big, Frozen] {
        const [volume, dollarVolume, toThaw] =
            super.uTradeTakesOpenMaker(uTrade, maker);
        this.assets.thaw(toThaw);

        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, RoundingMode.RoundUp);
        if (maker.operation === Operation.OPEN) {
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
        return [volume, dollarVolume, toThaw];
    }

    protected settle(): void {
        const position = clone(this.assets.position);
        for (const length of [Length.LONG, Length.SHORT] as const) {
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

interface ManagingAssetsEvents extends TakenEvents {
    positions: [Positions];
    balances: [Balances];
}

interface ManagingAssets extends EventEmitter {
    on<Event extends keyof ManagingAssetsEvents>(event: Event, listener: (...args: ManagingAssetsEvents[Event]) => void): this;
    once<Event extends keyof ManagingAssetsEvents>(event: Event, listener: (...args: ManagingAssetsEvents[Event]) => void): this;
    off<Event extends keyof ManagingAssetsEvents>(event: Event, listener: (...args: ManagingAssetsEvents[Event]) => void): this;
    emit<Event extends keyof ManagingAssetsEvents>(event: Event, ...args: ManagingAssetsEvents[Event]): boolean;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    emit(event: string | symbol, ...args: any[]): boolean;
}

// interface ManagingAssets extends EventEmitter {
//     emit(event: 'positions', positions: Positions): boolean;
//     emit(event: 'balances', balances: Balances): boolean;
//     on(event: 'positions', listener: (positions: Positions) => void): this;
//     on(event: 'balances', listener: (balances: Balances) => void): this;
//     off(event: 'positions', listener: (positions: Positions) => void): this;
//     off(event: 'balances', listener: (balances: Balances) => void): this;
//     once(event: 'positions', listener: (positions: Positions) => void): this;
//     once(event: 'balances', listener: (balances: Balances) => void): this;

//     // extended from Pushing
//     emit(event: 'orderbook', orderbook: Orderbook): boolean;
//     emit(event: 'trades', trades: Trade[]): boolean;
//     emit(event: 'error', err: Error): boolean;
//     on(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
//     on(event: 'trades', listener: (trades: Trade[]) => void): this;
//     on(event: 'error', listener: (err: Error) => void): this;
//     off(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
//     off(event: 'trades', listener: (trades: Trade[]) => void): this;
//     off(event: 'error', listener: (err: Error) => void): this;
//     once(event: 'orderbook', listener: (orderbook: Orderbook) => void): this;
//     once(event: 'trades', listener: (trades: Trade[]) => void): this;
//     once(event: 'error', listener: (err: Error) => void): this;
// }

export {
    ManagingAssets as default,
    ManagingAssets,
    ManagingAssetsEvents,
}
