import { Taken } from './3-taken';
import { Operation, Length, clone, } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './manager-assets';
import assert from 'assert';
class ManagingAssets extends Taken {
    constructor(config, snapshot, now) {
        super(config, snapshot, now);
        this.assets = new AssetsManager(config, snapshot, () => this.settlementPrice, () => this.latestPrice);
    }
    /** @override */
    makeOpenOrder(order) {
        this.validateOrder(order);
        this.enoughPosition(order);
        if (this.config.ONE_WAY_POSITION)
            this.singleLength(order);
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
    cancelOrder(order) {
        const filled = this.openMakers.get(order.id)?.filled || order.quantity;
        const toThaw = this.openMakers.removeOrder(order.id);
        if (toThaw)
            this.assets.thaw(toThaw);
        return {
            price: order.price,
            quantity: order.quantity,
            side: order.side,
            length: order.length,
            operation: order.operation,
            id: order.id,
            filled,
            unfilled: order.quantity.minus(filled),
        };
    }
    getPositions() {
        this.settle();
        return clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
    }
    getBalances() {
        this.settle();
        return clone({
            balance: this.assets.balance,
            reserve: this.assets.reserve,
            time: this.now(),
        });
    }
    enoughPosition(order) {
        if (order.operation === Operation.CLOSE)
            assert(order.unfilled.lte(new Big(0)
                .plus(this.assets.position[order.side * order.operation])
                .minus(this.assets.frozenPosition[order.side * order.operation])));
    }
    singleLength(order) {
        assert(this.assets.position[-order.length].eq(0));
    }
    enoughReserve(order) {
        if (order.operation === Operation.OPEN)
            assert(new Big(0)
                .plus(this.config.calcInitialMargin(this.config, order, this.settlementPrice, this.latestPrice)).plus(this.config.calcDollarVolume(order.price, order.unfilled).times(this.config.TAKER_FEE_RATE)).round(this.config.CURRENCY_DP)
                .lte(this.assets.reserve));
    }
    orderTakes(taker) {
        const [uTrades, volume, dollarVolume] = super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (taker.operation === Operation.OPEN) {
            this.assets.openPosition(taker.length, volume, dollarVolume, takerFee);
            this.assets.incMargin(taker.price, volume);
        }
        else {
            this.assets.closePosition(taker.length, volume, dollarVolume, takerFee);
            this.assets.decMargin(volume);
        }
        return [uTrades, volume, dollarVolume];
    }
    async pushPositionsAndBalances() {
        this.settle();
        const positions = {
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        };
        const balances = {
            balance: this.assets.balance,
            reserve: this.assets.reserve,
            time: this.now(),
        };
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
    orderMakes(openOrder) {
        const toFreeze = super.orderMakes(openOrder);
        this.assets.freeze(toFreeze);
        return toFreeze;
    }
    uTradeTakesOpenMaker(uTrade, maker) {
        const { volume, dollarVolume, toThaw } = super.uTradeTakesOpenMaker(uTrade, maker);
        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === Operation.OPEN) {
            this.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.incMargin(maker.price, volume);
        }
        else {
            this.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.decMargin(volume);
        }
        return { volume, dollarVolume, toThaw };
    }
    settle() {
        const position = clone(this.assets.position);
        for (const length of [Length.LONG, Length.SHORT]) {
            const settlementDollarVolume = this.config.calcDollarVolume(this.settlementPrice, position[length]).round(this.config.CURRENCY_DP);
            this.assets.closePosition(length, position[length], settlementDollarVolume, new Big(0));
            this.assets.openPosition(length, position[length], settlementDollarVolume, new Big(0));
        }
    }
    updateTrades(uTrades) {
        const totalVolume = super.updateTrades(uTrades);
        if (totalVolume.gt(0))
            this.pushPositionsAndBalances()
                .catch(err => void this.emit('error', err));
        return totalVolume;
    }
    // TODO 考虑现货
    getSnapshot() {
        return {
            balance: this.assets.balance,
            settlementPrice: this.settlementPrice,
        };
    }
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=4-assets.js.map