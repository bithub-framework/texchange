"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hub = void 0;
const events_1 = require("events");
const assets_1 = require("./models/assets");
const margin_1 = require("./models/margin");
const makers_1 = require("./models/makers");
const book_1 = require("./models/book");
const mtm_1 = require("./models/mtm");
const progress_1 = require("./models/progress");
const calculation_1 = require("./presenters/calculation");
const clearing_1 = require("./presenters/clearing");
const taking_1 = require("./presenters/taking");
const taken_1 = require("./presenters/taken");
const making_1 = require("./presenters/making");
const validation_1 = require("./presenters/validation");
const account_view_1 = require("./presenters/account-view");
const instant_1 = require("./views/instant");
const latency_1 = require("./views/latency");
const joystick_1 = require("./views/joystick");
class Hub extends events_1.EventEmitter {
    constructor(config, timeline) {
        super();
        this.presenters = {
            clearing: new clearing_1.Clearing(this),
            making: new making_1.Making(this),
            taking: new taking_1.Taking(this),
            taken: new taken_1.Taken(this),
            validation: new validation_1.Validation(this),
            accountView: new account_view_1.AccountView(this),
        };
        this.views = {
            instant: new instant_1.Instant(this),
            latency: new latency_1.Latency(this),
            joystick: new joystick_1.Joystick(this),
        };
        this.context = {
            config,
            timeline,
            calculation: new calculation_1.Calculation(this),
        };
        this.models = {
            assets: new assets_1.Assets(this),
            margin: new margin_1.Margin(this),
            makers: new makers_1.Makers(this),
            book: new book_1.Book(this),
            mtm: new mtm_1.DefaultMtm(this, config.initialMarkPrice),
            progress: new progress_1.Progress(this),
        };
    }
    capture() {
        return {
            assets: this.models.assets.capture(),
            margin: this.models.margin.capture(),
            makers: this.models.makers.capture(),
            book: this.models.book.capture(),
            mtm: this.models.mtm.capture(),
            progress: this.models.progress.capture(),
        };
    }
    restore(backup) {
        this.models.assets.restore(backup.assets);
        this.models.margin.restore(backup.margin);
        this.models.makers.restore(backup.makers);
        this.models.book.restore(backup.book);
        this.models.mtm.restore(backup.mtm);
        this.models.progress.restore(backup.progress);
    }
}
exports.Hub = Hub;
//# sourceMappingURL=hub.js.map