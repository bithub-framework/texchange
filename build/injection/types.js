"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = exports.FACADES = exports.USE_CASES = exports.MIDDLEWARES = exports.MODELS = void 0;
class MODELS {
}
exports.MODELS = MODELS;
MODELS.initialBalance = Symbol('initialBalance');
MODELS.creditAssets = Symbol('creditAssets');
MODELS.marginAssets = Symbol('marginAssets');
MODELS.book = Symbol('book');
MODELS.progress = Symbol('progress');
MODELS.pricing = Symbol('pricing');
MODELS.makers = Symbol('makers');
class MIDDLEWARES {
}
exports.MIDDLEWARES = MIDDLEWARES;
MIDDLEWARES.broadcast = Symbol('broadcast');
MIDDLEWARES.availableAssetsCalculator = Symbol('availableAssetsCalculator');
MIDDLEWARES.databaseTradeHandler = Symbol('databaseTradeHandler');
MIDDLEWARES.matcher = Symbol('matcher');
MIDDLEWARES.orderValidator = Symbol('orderValidator');
class USE_CASES {
}
exports.USE_CASES = USE_CASES;
USE_CASES.makeOrder = Symbol('makeOrder');
USE_CASES.cancelOrder = Symbol('cancelOrder');
USE_CASES.amendOrder = Symbol('amendOrder');
USE_CASES.getOpenOrders = Symbol('getOpenOrders');
USE_CASES.getPositions = Symbol('getPositions');
USE_CASES.getBalances = Symbol('getBalances');
USE_CASES.updateOrderbook = Symbol('updateOrderbook');
USE_CASES.subscription = Symbol('subscription');
USE_CASES.getProgress = Symbol('getProgress');
USE_CASES.updateTrades = Symbol('updateTrades');
class FACADES {
}
exports.FACADES = FACADES;
FACADES.admin = Symbol('admin');
FACADES.userMarket = Symbol('userMarket');
FACADES.instant = Symbol('instant');
FACADES.config = Symbol('config');
FACADES.userAccount = Symbol('userAccount');
class TYPES {
}
exports.TYPES = TYPES;
TYPES.marketSpec = Symbol('marketSpec');
TYPES.accountSpec = Symbol('accountSpec');
TYPES.vmctx = Symbol('vmctx');
TYPES.MODELS = MODELS;
TYPES.MIDDLEWARES = MIDDLEWARES;
TYPES.mtm = Symbol('mtm');
TYPES.USE_CASES = USE_CASES;
TYPES.FACADES = FACADES;
TYPES.texchange = Symbol('texchange');
//# sourceMappingURL=types.js.map