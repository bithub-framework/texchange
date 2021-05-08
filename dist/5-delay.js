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
            return await super.makeOrders(orders);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.amendOrders(amendments);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.cancelOrders(orders);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getBalances();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getPositions();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return await super.getOpenOrders();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    /** @override */
    async pushOrderbook() {
        const orderbook = clone(this.bookManager.getBook());
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('orderbook', orderbook);
    }
    /** @override */
    async pushUTrades(uTrades) {
        const trades = clone(this.uTrade2Trade(uTrades));
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
    }
    /** @override */
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
        await this.sleep(this.config.PROCESSING);
        await this.sleep(this.config.PING);
        this.emit('positions', positions);
        this.emit('balances', balances);
    }
}
export { Texchange as default, Texchange, };
//# sourceMappingURL=5-delay.js.map