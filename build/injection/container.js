"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const injektor_1 = require("@zimtsui/injektor");
const types_1 = require("./types");
// Context
const context_1 = require("../context");
const data_1 = require("../interfaces/data");
// Models
const models_1 = require("../texchange/models");
// import { Makers } from '../models.d/makers/makers';
// import { Pricing } from '../models.d/pricing/pricing';
// import { Assets } from '../models.d/assets';
// import { Book } from '../models.d/book';
// import { Progress } from '../models.d/progress';
// import { Margins } from '../models.d/margins';
const MODELS = require("../models.d");
// Broadcast
const broadcast_1 = require("../broadcast");
// Tasks
const tasks_1 = require("../texchange/tasks");
const TASKS = require("../tasks.d");
// UseCases
const use_cases_1 = require("../texchange/use-cases");
const USE_CASES = require("../use-cases.d");
// Facades
const facades_1 = require("../texchange/facades");
const instant_1 = require("../facades.d/instant");
const latency_1 = require("../facades.d/latency");
const joystick_1 = require("../facades.d/joystick");
// Texchange
const texchange_1 = require("../texchange/texchange");
class Container extends injektor_1.BaseContainer {
    constructor() {
        super(...arguments);
        this[_a] = this.rcs(data_1.DataStatic);
        this[_b] = this.rcs(context_1.Context);
        this[_c] = this.rcs(MODELS.Assets);
        this[_d] = this.rcs(MODELS.Margins);
        this[_e] = this.rcs(MODELS.Book);
        this[_f] = this.rcs(MODELS.Progress);
        this[_g] = this.rcs(models_1.Models);
        this[_h] = this.rcs(broadcast_1.Broadcast);
        this[_j] = this.rcs(tasks_1.Tasks);
        this[_k] = this.rcs(TASKS.MakeOpenOrder);
        this[_l] = this.rcs(TASKS.CancelOpenOrder);
        this[_m] = this.rcs(TASKS.GetBalances);
        this[_o] = this.rcs(TASKS.GetClosable);
        this[_p] = this.rcs(TASKS.GetPositions);
        this[_q] = this.rcs(TASKS.OrderMakes);
        this[_r] = this.rcs(TASKS.OrderTakes);
        this[_s] = this.rcs(TASKS.TradeTakesOpenMakers);
        this[_t] = this.rcs(TASKS.ValidateOrder);
        this[_u] = this.rcs(TASKS.OrderVolumes);
        this[_v] = this.rcs(use_cases_1.UseCases);
        this[_w] = this.rcs(USE_CASES.MakeOrder);
        this[_x] = this.rcs(USE_CASES.CancelOrder);
        this[_y] = this.rcs(USE_CASES.AmendOrder);
        this[_z] = this.rcs(USE_CASES.GetOpenOrders);
        this[_0] = this.rcs(USE_CASES.GetPositions);
        this[_1] = this.rcs(USE_CASES.GetBalances);
        this[_2] = this.rcs(USE_CASES.UpdateOrderbook);
        this[_3] = this.rcs(USE_CASES.UpdateTrades);
        this[_4] = this.rcs(USE_CASES.Subscription);
        this[_5] = this.rcs(USE_CASES.GetProgress);
        this[_6] = this.rcs(facades_1.Facades);
        this[_7] = this.rcs(instant_1.Instant);
        this[_8] = this.rcs(latency_1.Latency);
        this[_9] = this.rcs(joystick_1.Joystick);
        this[_10] = this.rfs(() => this[types_1.TYPES.Facades]().latency);
        this[_11] = this.rfs(() => this[types_1.TYPES.Facades]().joystick);
        this[_12] = this.rcs(texchange_1.Texchange);
    }
}
exports.Container = Container;
_a = types_1.TYPES.DataStatic, _b = types_1.TYPES.Context, _c = types_1.TYPES.MODELS.Assets, _d = types_1.TYPES.MODELS.Margins, _e = types_1.TYPES.MODELS.Book, _f = types_1.TYPES.MODELS.Progress, _g = types_1.TYPES.Models, _h = types_1.TYPES.Broadcast, _j = types_1.TYPES.Tasks, _k = types_1.TYPES.TASKS.MakeOpenOrder, _l = types_1.TYPES.TASKS.CancelOpenOrder, _m = types_1.TYPES.TASKS.GetBalances, _o = types_1.TYPES.TASKS.GetClosable, _p = types_1.TYPES.TASKS.GetPositions, _q = types_1.TYPES.TASKS.OrderMakes, _r = types_1.TYPES.TASKS.OrderTakes, _s = types_1.TYPES.TASKS.TradeTakesOpenMakers, _t = types_1.TYPES.TASKS.ValidateOrder, _u = types_1.TYPES.TASKS.OrderVolumes, _v = types_1.TYPES.UseCases, _w = types_1.TYPES.USE_CASES.MakeOrder, _x = types_1.TYPES.USE_CASES.CancelOrder, _y = types_1.TYPES.USE_CASES.AmendOrder, _z = types_1.TYPES.USE_CASES.GetOpenOrders, _0 = types_1.TYPES.USE_CASES.GetPositions, _1 = types_1.TYPES.USE_CASES.GetBalances, _2 = types_1.TYPES.USE_CASES.UpdateOrderbook, _3 = types_1.TYPES.USE_CASES.UpdateTrades, _4 = types_1.TYPES.USE_CASES.Subscription, _5 = types_1.TYPES.USE_CASES.GetProgress, _6 = types_1.TYPES.Facades, _7 = types_1.TYPES.Instant, _8 = types_1.TYPES.Latency, _9 = types_1.TYPES.Joystick, _10 = types_1.TYPES.UserTex, _11 = types_1.TYPES.AdminTex, _12 = types_1.TYPES.Texchange;
//# sourceMappingURL=container.js.map