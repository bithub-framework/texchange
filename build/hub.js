"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hub = exports.Context = exports.Views = exports.Presenters = exports.Models = void 0;
const events_1 = require("events");
const assets_1 = require("./models/assets");
const margin_1 = require("./models/margin");
const makers_1 = require("./models/makers");
const book_1 = require("./models/book");
const mtm_1 = require("./models/mtm");
const progress_1 = require("./models/progress");
const validation_1 = require("./presenters/validation");
const clearing_1 = require("./presenters/clearing");
const taking_1 = require("./presenters/taking");
const taken_1 = require("./presenters/taken");
const making_1 = require("./presenters/making");
const updating_1 = require("./presenters/updating");
const calculation_1 = require("./context/calculation");
const instant_1 = require("./views/instant");
const latency_1 = require("./views/latency");
class Models {
    constructor(hub) {
        this.assets = new assets_1.Assets(hub);
        this.margin = new margin_1.Margin(hub);
        this.makers = new makers_1.Makers(hub);
        this.orderbooks = new book_1.Book(hub);
        this.mtm = new mtm_1.DefaultMtm(hub);
        this.progress = new progress_1.Progress(hub);
    }
    capture() {
        return {
            assets: this.assets.capture(),
            margin: this.margin.capture(),
            makers: this.makers.capture(),
            book: this.orderbooks.capture(),
            mtm: this.mtm.capture(),
            progress: this.progress.capture(),
        };
    }
    restore(backup) {
        this.assets.restore(backup.assets);
        this.margin.restore(backup.margin);
        this.makers.restore(backup.makers);
        this.orderbooks.restore(backup.book);
        this.mtm.restore(backup.mtm);
        this.progress.restore(backup.progress);
    }
}
exports.Models = Models;
class Presenters {
    constructor(hub) {
        this.clearing = new clearing_1.Clearing(hub);
        this.making = new making_1.Making(hub);
        this.taking = new taking_1.Taking(hub);
        this.taken = new taken_1.Taken(hub);
        this.updating = new updating_1.Updating(hub);
        this.validation = new validation_1.Validation(hub);
    }
}
exports.Presenters = Presenters;
class Views {
    constructor(hub) {
        this.instant = new instant_1.Instant(hub);
        this.latency = new latency_1.Latency(hub);
    }
}
exports.Views = Views;
class Context {
    constructor(hub, config, timeline) {
        this.config = config;
        this.timeline = timeline;
        this.calculation = new calculation_1.DefaultCalculation(hub);
    }
}
exports.Context = Context;
class Hub extends events_1.EventEmitter {
    constructor(config, timeline) {
        super();
        this.models = new Models(this);
        this.presenters = new Presenters(this);
        this.views = new Views(this);
        this.context = new Context(this, config, timeline);
    }
    capture() {
        return {
            models: this.models.capture(),
        };
    }
    restore(backup) {
        this.models.restore(backup.models);
    }
}
exports.Hub = Hub;
//# sourceMappingURL=hub.js.map