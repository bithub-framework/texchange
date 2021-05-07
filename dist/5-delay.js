import { ManagingAssets } from './4-assets';
import { clone, } from './interfaces';
class Texchange extends ManagingAssets {
    constructor(config, snapshot, sleep, now) {
        super(config, snapshot, now);
        this.sleep = sleep;
    }
    async makeOrdersDelay(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.makeOrder(order));
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async amendOrdersDelay(amendments) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return amendments.map(order => this.amendOrder(order));
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrdersDelay(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return orders.map(order => this.cancelOrder(order));
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getBalancesDelay() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getBalances();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getPositionsDelay() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getPositions();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrdersDelay() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.getOpenOrders();
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