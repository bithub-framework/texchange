"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
class MODELS {
}
MODELS.initialBalance = Symbol();
MODELS.Makers = Symbol();
MODELS.Assets = Symbol();
MODELS.Margins = Symbol();
MODELS.Book = Symbol();
MODELS.Progress = Symbol();
MODELS.Pricing = Symbol();
class USE_CASES {
}
USE_CASES.MakeOrder = Symbol();
USE_CASES.CancelOrder = Symbol();
USE_CASES.AmendOrder = Symbol();
USE_CASES.GetOpenOrders = Symbol();
USE_CASES.GetPositions = Symbol();
USE_CASES.GetBalances = Symbol();
USE_CASES.UpdateOrderbook = Symbol();
USE_CASES.Subscription = Symbol();
USE_CASES.GetProgress = Symbol();
USE_CASES.UpdateTrades = Symbol();
USE_CASES.realTimeSettlement = Symbol();
class TASKS {
}
TASKS.MakeOpenOrder = Symbol();
TASKS.CancelOpenOrder = Symbol();
TASKS.GetBalances = Symbol();
TASKS.GetClosable = Symbol();
TASKS.GetPositions = Symbol();
TASKS.OrderMakes = Symbol();
TASKS.OrderTakes = Symbol();
TASKS.TradeTakesOpenMakers = Symbol();
TASKS.ValidateOrder = Symbol();
TASKS.OrderVolumes = Symbol();
TASKS.GetAvailable = Symbol();
TASKS.MarginAccumulation = Symbol();
TASKS.Settle = Symbol();
class TYPES {
}
exports.TYPES = TYPES;
// public static readonly Config = Symbol();
TYPES.spec = Symbol();
TYPES.HStatic = Symbol();
TYPES.TimelineLike = Symbol();
TYPES.MarketCalc = Symbol();
TYPES.DataStatic = Symbol();
TYPES.Context = Symbol();
TYPES.Models = Symbol();
TYPES.MODELS = MODELS;
TYPES.Broadcast = Symbol();
TYPES.Tasks = Symbol();
TYPES.Mtm = Symbol();
TYPES.UseCases = Symbol();
TYPES.USE_CASES = USE_CASES;
TYPES.TASKS = TASKS;
TYPES.Facades = Symbol();
TYPES.DelayConfig = Symbol();
TYPES.Instant = Symbol();
TYPES.Latency = Symbol();
TYPES.Joystick = Symbol();
TYPES.UserTex = Symbol();
TYPES.AdminTex = Symbol();
TYPES.Texchange = Symbol();
// export namespace TYPES {
// 	export const Config = Symbol();
// 	export const HStatic = Symbol();
// 	export const TimelineLike = Symbol();
// 	export const MarketCalc = Symbol();
// 	export const DataStatic = Symbol();
// 	export const Context = Symbol();
// 	export const Makers = Symbol();
// 	export const Pricing = Symbol();
// 	export const Models = Symbol();
// 	export const Broadcast = Symbol();
// 	export const UpdateTrades = Symbol();
// 	export const Tasks = Symbol();
// 	export const Mtm = Symbol();
// 	export const UseCases = Symbol();
// 	export const Facades = Symbol();
// 	export const UserTex = Symbol();
// 	export const AdminTex = Symbol();
// 	export const Texchange = Symbol();
// }
//# sourceMappingURL=types.js.map