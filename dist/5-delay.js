import { ManagingAssets } from './4-assets';
import { clone, } from './interfaces';
class Texchange extends ManagingAssets {
    constructor(config, sleep, now) {
        super(config, now);
        this.sleep = sleep;
    }
    async makeLimitOrder(order) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.makeLimitOrderSync(order);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async remakeLimitOrder(oid, order) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.remakeLimitOrderSync(oid, order);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrder(oid) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.cancelOrderSync(oid);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getBalancesSync();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getPositionsSync();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getOpenOrdersSync();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async pushOrderbook() {
        const orderbook = clone(this.orderbook);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }
    async pushUTrades(uTrades) {
        const trades = clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
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
            reserve: this.assets.reserve,
            time: this.now(),
        });
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}
export { Texchange as default, Texchange, };
//# sourceMappingURL=5-delay.js.map