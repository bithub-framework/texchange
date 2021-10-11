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
const ordering_1 = require("./methods/ordering");
const clearing_1 = require("./methods/clearing");
const taking_1 = require("./methods/taking");
const taken_1 = require("./methods/taken");
const making_1 = require("./methods/making");
const updating_1 = require("./methods/updating");
const calculation_1 = require("./methods/calculation");
const instant_1 = require("./interfaces/instant");
const latency_1 = require("./interfaces/latency");
class Core extends startable_1.Startable {
    constructor(config, timeline, snapshot) {
        super();
        this.config = config;
        this.timeline = timeline;
        this.ordering = new ordering_1.MethodsOrdering(this);
        this.clearing = new clearing_1.MethodsClearing(this);
        this.making = new making_1.MethodsMaking(this);
        this.taking = new taking_1.MethodsTaking(this);
        this.taken = new taken_1.MethodsTaken(this);
        this.updating = new updating_1.MethodsUpdating(this);
        this.validation = new validation_1.MethodsValidation(this);
        this.calculation = new calculation_1.MethodsCalculation(this);
        this.states = {
            assets: new assets_1.StateAssets(this, snapshot.assets),
            margin: new margin_1.StateMargin(this, snapshot.margin),
            makers: new makers_1.StateMakers(this, snapshot.makers),
            orderbook: new orderbook_1.StateOrderbook(this),
            mtm: new mtm_1.StateMtm(snapshot.mtm),
            misc: new misc_1.StateMisc(snapshot.misc),
        };
        this.interfaces = {
            instant: new instant_1.InterfaceInstant(this),
            latency: new latency_1.InterfaceLatency(this),
        };
    }
    async _start() {
        await this.states.misc.start(this.stop);
        await this.states.mtm.start(this.stop);
    }
    async _stop() { }
}
exports.Core = Core;
//# sourceMappingURL=core.js.map