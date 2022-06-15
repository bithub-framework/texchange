declare class MODELS {
    static readonly initialBalance: unique symbol;
    static readonly makers: unique symbol;
    static readonly assets: unique symbol;
    static readonly margins: unique symbol;
    static readonly book: unique symbol;
    static readonly progress: unique symbol;
    static readonly pricing: unique symbol;
}
declare class TASKS {
    static readonly makeOpenOrder: unique symbol;
    static readonly cancelOpenOrder: unique symbol;
    static readonly getBalances: unique symbol;
    static readonly getClosable: unique symbol;
    static readonly getPositions: unique symbol;
    static readonly orderMakes: unique symbol;
    static readonly orderTakes: unique symbol;
    static readonly tradeTakesOpenMakers: unique symbol;
    static readonly validateOrder: unique symbol;
    static readonly orderVolumes: unique symbol;
    static readonly getAvailable: unique symbol;
    static readonly marginAccumulation: unique symbol;
    static readonly settle: unique symbol;
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
    static readonly realTimeSettlement: unique symbol;
}
export declare class FACADES {
    static readonly admin: unique symbol;
    static readonly userMarket: unique symbol;
    static readonly instant: unique symbol;
    static readonly config: unique symbol;
    static readonly userAccount: unique symbol;
}
export declare class TYPES {
    static readonly spec: unique symbol;
    static readonly hStatic: unique symbol;
    static readonly timeline: unique symbol;
    static readonly marketCalc: unique symbol;
    static readonly dataStatic: unique symbol;
    static readonly context: unique symbol;
    static readonly models: unique symbol;
    static readonly MODELS: typeof MODELS;
    static readonly broadcast: unique symbol;
    static readonly tasks: unique symbol;
    static readonly mtm: unique symbol;
    static readonly useCases: unique symbol;
    static readonly USE_CASES: typeof USE_CASES;
    static readonly TASKS: typeof TASKS;
    static readonly facades: unique symbol;
    static readonly FACADES: typeof FACADES;
    static readonly texchange: unique symbol;
}
export {};
