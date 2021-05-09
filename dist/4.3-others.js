import { Texchange as Parent, } from './4.2-taken';
import { clone, Length, } from './interfaces';
import Big from 'big.js';
class Texchange extends Parent {
    settle() {
        const position = clone(this.assets.position);
        for (const length of [Length.LONG, Length.SHORT]) {
            const settlementDollarVolume = this.config.calcDollarVolume(this.settlementPrice, position[length]).round(this.config.CURRENCY_DP);
            this.assets.closePosition(length, position[length], settlementDollarVolume, new Big(0));
            this.assets.openPosition(length, position[length], settlementDollarVolume, new Big(0));
        }
    }
    /** @override */
    cancelOpenOrder(order) {
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
    async getPositions() {
        this.settle();
        return clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
    }
    async getBalances() {
        this.settle();
        return clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
    }
    async pushPositionsAndBalances() {
        this.settle();
        const positions = clone({
            position: this.assets.position,
            closable: this.assets.closable,
            time: this.now(),
        });
        const balances = clone({
            balance: this.assets.balance,
            available: this.assets.available,
            time: this.now(),
        });
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
    // TODO 考虑现货
    getSnapshot() {
        return {
            balance: this.assets.balance,
            settlementPrice: this.settlementPrice,
        };
    }
}
export { Texchange, };
//# sourceMappingURL=4.3-others.js.map