declare class MODELS {
    static readonly initialBalance: unique symbol;
    static readonly assets: unique symbol;
    static readonly marginAssets: unique symbol;
    static readonly book: unique symbol;
    static readonly progress: unique symbol;
    static readonly pricing: unique symbol;
    static readonly makers: unique symbol;
}
declare class MIDDLEWARES {
    static readonly broadcast: unique symbol;
    static readonly availableAssetsCalculator: unique symbol;
    static readonly databaseTradeHandler: unique symbol;
    static readonly matcher: unique symbol;
    static readonly orderValidator: unique symbol;
}
declare class USE_CASES {
    static readonly makeOrder: unique symbol;
    static readonly cancelOrder: unique symbol;
    static readonly amendOrder: unique symbol;
    static readonly getOpenOrders: unique symbol;
    static readonly getPositions: unique symbol;
    static readonly getBalances: unique symbol;
    static readonly updateOrderbook: unique symbol;
    static readonly subscription: unique symbol;
    static readonly getProgress: unique symbol;
    static readonly updateTrades: unique symbol;
}
export declare class FACADES {
    static readonly admin: unique symbol;
    static readonly userMarket: unique symbol;
    static readonly instant: unique symbol;
    static readonly config: unique symbol;
    static readonly userAccount: unique symbol;
}
export declare class TYPES {
    static readonly marketSpec: unique symbol;
    static readonly accountSpec: unique symbol;
    static readonly hStatic: unique symbol;
    static readonly timeline: unique symbol;
    static readonly dataStatic: unique symbol;
    static readonly context: unique symbol;
    static readonly MODELS: typeof MODELS;
    static readonly MIDDLEWARES: typeof MIDDLEWARES;
    static readonly mtm: unique symbol;
    static readonly USE_CASES: typeof USE_CASES;
    static readonly FACADES: typeof FACADES;
    static readonly texchange: unique symbol;
}
export {};
