"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texchange = void 0;
const _4_assets_1 = require("./4-assets");
const events_1 = require("events");
class Texchange extends events_1.EventEmitter {
    constructor(config, snapshot, sleep, now) {
        super();
        this.config = config;
        this.sleep = sleep;
        this.core = new _4_assets_1.Texchange(config, snapshot, now);
        ({
            PRICE_DP: this.PRICE_DP,
            CURRENCY_DP: this.CURRENCY_DP,
            QUANTITY_DP: this.QUANTITY_DP,
            TICK_SIZE: this.TICK_SIZE,
            calcDollarVolume: this.calcDollarVolume,
            calcQuantity: this.calcQuantity,
            LEVERAGE: this.LEVERAGE,
            TAKER_FEE_RATE: this.TAKER_FEE_RATE,
            MAKER_FEE_RATE: this.MAKER_FEE_RATE,
            ONE_WAY_POSITION: this.ONE_WAY_POSITION,
        } = config);
        this.core.on('error', err => void this.emit('error', err));
        this.core.on('orderbook', async (orderbook) => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('orderbook', orderbook);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.core.on('trades', async (trades) => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('trades', trades);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.core.on('positions', async (trades) => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('positions', trades);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
        this.core.on('balances', async (trades) => {
            try {
                await this.sleep(this.config.PROCESSING);
                await this.sleep(this.config.PING);
                this.emit('balances', trades);
            }
            catch (err) {
                this.emit('error', err);
            }
        });
    }
    async makeOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.makeOrders(orders);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async amendOrders(amendments) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.amendOrders(amendments);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async cancelOrders(orders) {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.cancelOrders(orders);
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getBalances() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.getBalances();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getPositions() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.getPositions();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
    async getOpenOrders() {
        try {
            await this.sleep(this.config.PING);
            await this.sleep(this.config.PROCESSING);
            return this.core.getOpenOrders();
        }
        finally {
            await this.sleep(this.config.PING);
        }
    }
}
exports.Texchange = Texchange;
//# sourceMappingURL=5-delay.js.map