class MODELS {
	public static readonly initialBalance = Symbol();
	public static readonly assets = Symbol();
	public static readonly marginAssets = Symbol();
	public static readonly book = Symbol();
	public static readonly progress = Symbol();
	public static readonly pricing = Symbol();
	public static readonly makers = Symbol();
}


class MIDDLEWARES {
	public static readonly availableAssetsCalculator = Symbol();
	public static readonly databaseTradeHandler = Symbol();
	public static readonly userOrderHandler = Symbol();
	public static readonly orderValidator = Symbol();
}


class USE_CASES {
	public static readonly makeOrder = Symbol();
	public static readonly cancelOrder = Symbol();
	public static readonly amendOrder = Symbol();
	public static readonly getOpenOrders = Symbol();
	public static readonly getPositions = Symbol();
	public static readonly getBalances = Symbol();
	public static readonly updateOrderbook = Symbol();
	public static readonly subscription = Symbol();
	public static readonly getProgress = Symbol();
	public static readonly updateTrades = Symbol();

	public static readonly realTimeSettlement = Symbol();
}


export class FACADES {
	public static readonly admin = Symbol();
	public static readonly userMarket = Symbol();
	public static readonly instant = Symbol();
	public static readonly config = Symbol();
	public static readonly userAccount = Symbol();
}


export class TYPES {
	public static readonly marketSpec = Symbol();
	public static readonly accountSpec = Symbol();
	public static readonly hStatic = Symbol();
	public static readonly timeline = Symbol();
	public static readonly dataStatic = Symbol();
	public static readonly context = Symbol();

	public static readonly models = Symbol();
	public static readonly MODELS = MODELS;

	public static readonly broadcast = Symbol();

	public static readonly MIDDLEWARES = MIDDLEWARES;

	public static readonly mtm = Symbol();

	public static readonly useCases = Symbol();
	public static readonly USE_CASES = USE_CASES;

	public static readonly facades = Symbol();
	public static readonly FACADES = FACADES;

	public static readonly texchange = Symbol();
}
