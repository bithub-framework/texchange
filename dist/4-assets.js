import { Taken } from './3-taken';
import { LONG, SHORT, OPEN, CLOSE, clone, } from './interfaces';
import Big from 'big.js';
import { AssetsManager } from './manager-assets';
import assert from 'assert';
class ManagingAssets extends Taken {
    constructor(config, now) {
        super(config, now);
        this.assets = new AssetsManager(config, () => this.settlementPrice, () => this.latestPrice);
    }
    makeLimitOrderSync(order) {
        this.validateOrder(order);
        assert(!this.openOrders.has(order.id));
        this.enoughPosition(order);
        if (this.config.UNIDIRECTIONAL)
            this.singleLength(order);
        this.settle();
        this.enoughReserve(order);
        const openOrder = {
            ...order,
            filled: new Big(0),
        };
        const [uTrades] = this.orderTakes(openOrder);
        this.orderMakes(openOrder);
        if (uTrades.length) {
            this.pushUTrades(uTrades)
                .catch(err => void this.emit('error', err));
            this.pushOrderbook()
                .catch(err => void this.emit('error', err));
            this.pushPositionsAndBalances()
                .catch(err => void this.emit('error', err));
        }
        return new Big(0);
    }
    cancelOrderSync(oid) {
        const openOrder = this.openOrders.get(oid);
        const filled = openOrder ? openOrder.filled : null;
        const toThaw = this.openOrders.removeOrder(oid);
        this.assets.thaw(toThaw);
        return filled;
    }
    getPositionsSync() {
        this.settle();
        return clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
    }
    getBalancesSync() {
        this.settle();
        return clone({
            balance: this.assets.balance,
            reserve: this.assets.reserve,
            time: this.now(),
        });
    }
    enoughPosition(order) {
        if (order.operation === CLOSE)
            assert(order.quantity.lte(new Big(0)
                .plus(this.assets.position[order.side * order.operation])
                .minus(this.assets.frozenPosition[order.side * order.operation])));
    }
    singleLength(order) {
        assert(this.assets.position[-order.length].eq(0));
    }
    enoughReserve(order) {
        if (order.operation === OPEN)
            assert(new Big(0)
                .plus(this.config.calcInitialMargin(this.config, order, this.settlementPrice, this.latestPrice)).plus(this.config.calcDollarVolume(order.price, order.quantity).times(this.config.TAKER_FEE_RATE)).round(this.config.CURRENCY_DP)
                .lte(this.assets.reserve));
    }
    orderTakes(taker) {
        const [uTrades, volume, dollarVolume] = super.orderTakes(taker);
        const takerFee = dollarVolume.times(this.config.TAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (taker.operation === OPEN) {
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
        const toFreeze = this.openOrders.addOrder(openOrder);
        this.assets.freeze(toFreeze);
    }
    uTradeTakesOpenOrder(uTrade, maker) {
        const [volume, dollarVolume, toThaw] = super.uTradeTakesOpenOrder(uTrade, maker);
        this.assets.thaw(toThaw);
        const makerFee = dollarVolume.times(this.config.MAKER_FEE_RATE)
            .round(this.config.CURRENCY_DP, 3 /* RoundUp */);
        if (maker.operation === OPEN) {
            this.assets.openPosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.incMargin(maker.price, volume);
        }
        else {
            this.assets.closePosition(maker.length, volume, dollarVolume, makerFee);
            this.assets.decMargin(volume);
        }
        return [volume, dollarVolume, toThaw];
    }
    settle() {
        const position = clone(this.assets.position);
        for (const length of [LONG, SHORT]) {
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
}
export { ManagingAssets as default, ManagingAssets, };
//# sourceMappingURL=4-assets.js.map