import { ManagingAssets } from './4-assets';
import { clone, } from './interfaces';
class Texchange extends ManagingAssets {
    constructor(config, snapshot, sleep, now) {
        super(config, snapshot, now);
        this.sleep = sleep;
    }
    async makeOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.makeOrderNoDelay(order));
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return amendments.map(order => this.amendOrderNoDelay(order));
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.cancelOrderNoDelay(order));
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getBalancesNoDelay();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getPositionsNoDelay();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getOpenOrdersNoDelay();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async pushOrderbook() {
        const orderbook = clone(this.bookManager);
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }
    async pushUTrades(uTrades) {
        const trades = clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PROCESSING);
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
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}
export { Texchange as default, Texchange, };
//# sourceMappingURL=5-delay.js.map