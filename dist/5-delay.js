import { ManagingAssets } from './4-assets';
import { clone, } from './interfaces';
class Texchange extends ManagingAssets {
    constructor(config, sleep, now) {
        super(config, now);
        this.sleep = sleep;
    }
    async makeLimitOrder(order) {
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        const oid = await super.makeLimitOrder(order);
        await this.sleep(this.config.PING);
        return oid;
    }
    async cancelOrder(oid) {
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        await super.cancelOrder(oid);
        await this.sleep(this.config.PING);
    }
    async getAssets() {
        console.log(1);
        await this.sleep(this.config.PING);
        console.log(2);
        await this.sleep(this.config.PROCESSING);
        console.log(3);
        const assets = clone(super.getAssets());
        console.log(6);
        await this.sleep(this.config.PING);
        return assets;
    }
    async getOpenOrders() {
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        const openOrders = clone(super.getOpenOrders());
        await this.sleep(this.config.PING);
        return openOrders;
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