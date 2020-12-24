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
            return await super.makeLimitOrder(order);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrder(oid) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            await super.cancelOrder(oid);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getAssets() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return clone(await super.getAssets());
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return clone(await super.getOpenOrders());
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
    async pushRawTrades(rawTrades) {
        const trades = this.rawTrade2Trade(rawTrades);
        await this.sleep(this.config.PING);
        this.emit('trades', trades);
    }
}
export { Texchange as default, Texchange, };
//# sourceMappingURL=5-delay.js.map