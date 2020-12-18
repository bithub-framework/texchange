import { ManagingAssets } from './managing-assets';
import { clone } from 'ramda';
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
        await this.sleep(this.config.PING);
        await this.sleep(this.config.PROCESSING);
        const assets = clone(super.getAssets());
        await this.sleep(this.config.PING);
        return assets;
    }
    async pushOrderbook() {
        await this.sleep(this.config.PING);
        await super.pushOrderbook();
    }
    async pushRawTrades(rawTrades) {
        await this.sleep(this.config.PING);
        await super.pushRawTrades(rawTrades);
    }
}
export { Texchange as default, Texchange, };
//# sourceMappingURL=texchange.js.map