import { ManagingAssets } from './managing-assets';
import { clone } from 'ramda';
import { PING, PROCESSING, } from './config';
class Texchange extends ManagingAssets {
    constructor(assets, sleep, now) {
        super(assets, now);
        this.sleep = sleep;
    }
    async makeLimitOrder(order) {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        const oid = await super.makeLimitOrder(order);
        await this.sleep(PING);
        return oid;
    }
    async cancelOrder(oid) {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        await super.cancelOrder(oid);
        await this.sleep(PING);
    }
    async getAssets() {
        await this.sleep(PING);
        await this.sleep(PROCESSING);
        const assets = clone(super.getAssets());
        await this.sleep(PING);
        return assets;
    }
    async pushOrderbook() {
        await this.sleep(PING);
        await super.pushOrderbook();
    }
    async pushRawTrades(rawTrades) {
        await this.sleep(PING);
        await super.pushRawTrades(rawTrades);
    }
}
export { Texchange as default, Texchange, };
//# sourceMappingURL=texchange.js.map