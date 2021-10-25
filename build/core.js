"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const startable_1 = require("startable");
const assets_1 = require("./states/assets");
const margin_1 = require("./states/margin");
const makers_1 = require("./states/makers");
const orderbook_1 = require("./states/orderbook");
const mtm_1 = require("./states/mtm");
const misc_1 = require("./states/misc");
const validation_1 = require("./methods/validation");
const clearing_1 = require("./methods/clearing");
const taking_1 = require("./methods/taking");
const taken_1 = require("./methods/taken");
const making_1 = require("./methods/making");
const updating_1 = require("./methods/updating");
const calculation_1 = require("./methods/calculation");
const instant_1 = require("./interfaces/instant");
const latency_1 = require("./interfaces/latency");
const assert = require("assert");
class Core extends startable_1.Startable {
    constructor(config, timeline) {
        super();
        this.config = config;
        this.timeline = timeline;
        this.clearing = new clearing_1.MethodsClearing(this);
        this.making = new making_1.MethodsMaking(this);
        this.taking = new taking_1.MethodsTaking(this);
        this.taken = new taken_1.MethodsTaken(this);
        this.updating = new updating_1.MethodsUpdating(this);
        this.validation = new validation_1.MethodsValidation(this);
        this.calculation = new calculation_1.MethodsCalculation(this);
        this.states = {
            assets: new assets_1.StateAssets(this),
            margin: new margin_1.StateMargin(this),
            makers: new makers_1.StateMakers(this),
            orderbook: new orderbook_1.StateOrderbook(this),
            mtm: new mtm_1.StateMtm(this),
            misc: new misc_1.StateMisc(this),
        };
        this.interfaces = {
            instant: new instant_1.InterfaceInstant(this),
            latency: new latency_1.InterfaceLatency(this),
        };
    }
    // TODO Snapshot 中的无穷大
    capture() {
        assert(this.readyState === "STOPPED" /* STOPPED */ ||
            this.readyState === "STARTED" /* STARTED */);
        return {
            time: this.timeline.now(),
            assets: this.states.assets.capture(),
            margin: this.states.margin.capture(),
            makers: this.states.makers.capture(),
            misc: this.states.misc.capture(),
            mtm: this.states.mtm.capture(),
            orderbook: this.states.orderbook.capture(),
        };
    }
    restore(snapshot) {
        assert(this.readyState === "STOPPED" /* STOPPED */ ||
            this.readyState === "STARTED" /* STARTED */);
        this.states.misc.restore(snapshot.misc);
        this.states.assets.restore(snapshot.assets);
        this.states.margin.restore(snapshot.margin);
        this.states.makers.restore(snapshot.makers);
        this.states.mtm.restore(snapshot.mtm);
        this.states.orderbook.restore(snapshot.orderbook);
    }
    async _start() {
        const promises = [this.states.misc.start(this.stop)];
        if (this.states.mtm instanceof startable_1.Startable)
            promises.push(this.states.mtm.start(this.stop));
        const results = await Promise.allSettled(promises);
        results.forEach(result => {
            if (result.status === 'rejected')
                throw result.reason;
        });
    }
    async _stop() {
        await this.states.misc.stop();
        if (this.states.mtm instanceof startable_1.Startable)
            await this.states.mtm.stop();
    }
}
exports.Core = Core;
//# sourceMappingURL=core.js.map