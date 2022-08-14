export class MODELS {
	public static readonly initialBalance = Symbol('initialBalance');
	public static readonly creditAssets = Symbol('creditAssets');
	public static readonly marginAssets = Symbol('marginAssets');
	public static readonly book = Symbol('book');
	public static readonly progress = Symbol('progress');
	public static readonly pricing = Symbol('pricing');
	public static readonly makers = Symbol('makers');
}


export class MIDDLEWARES {
	public static readonly broadcast = Symbol('broadcast');
	public static readonly availableAssetsCalculator = Symbol('availableAssetsCalculator');
	public static readonly databaseTradeHandler = Symbol('databaseTradeHandler');
	public static readonly matcher = Symbol('matcher');
	public static readonly orderValidator = Symbol('orderValidator');
}


export class USE_CASES {
	public static readonly makeOrder = Symbol('makeOrder');
	public static readonly cancelOrder = Symbol('cancelOrder');
	public static readonly amendOrder = Symbol('amendOrder');
	public static readonly getOpenOrders = Symbol('getOpenOrders');
	public static readonly getPositions = Symbol('getPositions');
	public static readonly getBalances = Symbol('getBalances');
	public static readonly updateOrderbook = Symbol('updateOrderbook');
	public static readonly subscription = Symbol('subscription');
	public static readonly getProgress = Symbol('getProgress');
	public static readonly updateTrades = Symbol('updateTrades');
}


export class FACADES {
	public static readonly admin = Symbol('admin');
	public static readonly userMarket = Symbol('userMarket');
	public static readonly instant = Symbol('instant');
	public static readonly config = Symbol('config');
	public static readonly userAccount = Symbol('userAccount');
}


export class TYPES {
	public static readonly marketSpec = Symbol('marketSpec');
	public static readonly accountSpec = Symbol('accountSpec');

	public static readonly vmctx = Symbol('virtualMachineContext');

	public static readonly MODELS = MODELS;

	public static readonly MIDDLEWARES = MIDDLEWARES;

	public static readonly mtm = Symbol('mtm');

	public static readonly USE_CASES = USE_CASES;

	public static readonly FACADES = FACADES;

	public static readonly texchange = Symbol('texchange');
}
