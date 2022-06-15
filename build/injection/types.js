"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = exports.FACADES = void 0;
class MODELS {
}
MODELS.initialBalance = Symbol();
MODELS.makers = Symbol();
MODELS.assets = Symbol();
MODELS.margins = Symbol();
MODELS.book = Symbol();
MODELS.progress = Symbol();
MODELS.pricing = Symbol();
class TASKS {
}
TASKS.makeOpenOrder = Symbol();
TASKS.cancelOpenOrder = Symbol();
TASKS.getBalances = Symbol();
TASKS.getClosable = Symbol();
TASKS.getPositions = Symbol();
TASKS.orderMakes = Symbol();
TASKS.orderTakes = Symbol();
TASKS.tradeTakesOpenMakers = Symbol();
TASKS.validateOrder = Symbol();
TASKS.orderVolumes = Symbol();
TASKS.getAvailable = Symbol();
TASKS.marginAccumulation = Symbol();
TASKS.settle = Symbol();
class USE_CASES {
}
USE_CASES.makeOrder = Symbol();
USE_CASES.cancelOrder = Symbol();
USE_CASES.amendOrder = Symbol();
USE_CASES.getOpenOrders = Symbol();
USE_CASES.getPositions = Symbol();
USE_CASES.getBalances = Symbol();
USE_CASES.updateOrderbook = Symbol();
USE_CASES.subscription = Symbol();
USE_CASES.getProgress = Symbol();
USE_CASES.updateTrades = Symbol();
USE_CASES.realTimeSettlement = Symbol();
class FACADES {
}
exports.FACADES = FACADES;
FACADES.admin = Symbol();
FACADES.userMarket = Symbol();
FACADES.instant = Symbol();
FACADES.config = Symbol();
FACADES.userAccount = Symbol();
class TYPES {
}
exports.TYPES = TYPES;
TYPES.spec = Symbol();
TYPES.hStatic = Symbol();
TYPES.timeline = Symbol();
TYPES.marketCalc = Symbol();
TYPES.dataStatic = Symbol();
TYPES.context = Symbol();
TYPES.models = Symbol();
TYPES.MODELS = MODELS;
TYPES.broadcast = Symbol();
TYPES.tasks = Symbol();
TYPES.mtm = Symbol();
TYPES.useCases = Symbol();
TYPES.USE_CASES = USE_CASES;
TYPES.TASKS = TASKS;
TYPES.facades = Symbol();
TYPES.FACADES = FACADES;
TYPES.texchange = Symbol();
//# sourceMappingURL=types.js.map