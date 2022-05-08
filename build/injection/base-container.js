"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injektor_1 = require("injektor");
const types_1 = require("./types");
// Context
const context_1 = require("../context");
const data_1 = require("../interfaces/data");
// Models
const models_1 = require("../models");
// Broadcast
const broadcast_1 = require("../broadcast");
// UseCases
const use_cases_1 = require("../use-cases");
// Facades
const facades_1 = require("../facades");
// Texchange
const texchange_1 = require("../texchange");
class Container extends injektor_1.BaseContainer {
    constructor(config, timeline, H) {
        super();
        this.config = config;
        this.timeline = timeline;
        this.H = H;
        this[_a] = this.rv(this.config);
        this[_b] = this.rv(this.timeline);
        this[_c] = this.rv(this.H);
        this[_d] = this.rcs(data_1.DataStatic);
        this[_e] = this.rcs(context_1.Context);
        this[_f] = this.rcs(models_1.Models);
        this[_g] = this.rcs(broadcast_1.Broadcast);
        this[_h] = this.rcs(use_cases_1.UseCases);
        this[_j] = this.rcs(facades_1.Facades);
        this[_k] = this.rfs(() => this[types_1.TYPES.Facades]().latency);
        this[_l] = this.rfs(() => this[types_1.TYPES.Facades]().joystick);
        this[_m] = this.rcs(texchange_1.Texchange);
    }
}
exports.Container = Container;
_a = types_1.TYPES.Config, _b = types_1.TYPES.TimelineLike, _c = types_1.TYPES.HStatic, _d = types_1.TYPES.DataStatic, _e = types_1.TYPES.Context, _f = types_1.TYPES.Models, _g = types_1.TYPES.Broadcast, _h = types_1.TYPES.UseCases, _j = types_1.TYPES.Facades, _k = types_1.TYPES.UserTex, _l = types_1.TYPES.AdminTex, _m = types_1.TYPES.Texchange;
//# sourceMappingURL=base-container.js.map