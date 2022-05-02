"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseContainer = void 0;
const injektor_1 = require("injektor");
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
function createBaseContainer(config, timeline, H) {
    const c = new injektor_1.Container();
    c.rfs(context_1.Context, () => new context_1.Context(c.i(3 /* MarketCalc */), config, timeline, new data_1.DataStatic(H)));
    c.rcs(models_1.Models, models_1.Models);
    c.rc(broadcast_1.Broadcast, broadcast_1.Broadcast);
    c.rcs(use_cases_1.UseCases, use_cases_1.UseCases);
    c.rcs(facades_1.Facades, facades_1.Facades);
    c.rfs(4 /* UserTex */, () => c.i(facades_1.Facades).latency);
    c.rfs(5 /* AdminTex */, () => c.i(facades_1.Facades).joystick);
    c.rcs(texchange_1.Texchange, texchange_1.Texchange);
    return c;
}
exports.createBaseContainer = createBaseContainer;
//# sourceMappingURL=base-container.js.map