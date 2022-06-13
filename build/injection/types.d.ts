declare class MODELS {
    static readonly initialBalance: unique symbol;
    static readonly Makers: unique symbol;
    static readonly Assets: unique symbol;
    static readonly Margins: unique symbol;
    static readonly Book: unique symbol;
    static readonly Progress: unique symbol;
    static readonly Pricing: unique symbol;
}
declare class USE_CASES {
    static readonly MakeOrder: unique symbol;
    static readonly CancelOrder: unique symbol;
    static readonly AmendOrder: unique symbol;
    static readonly GetOpenOrders: unique symbol;
    static readonly GetPositions: unique symbol;
    static readonly GetBalances: unique symbol;
    static readonly UpdateOrderbook: unique symbol;
    static readonly Subscription: unique symbol;
    static readonly GetProgress: unique symbol;
    static readonly UpdateTrades: unique symbol;
    static readonly realTimeSettlement: unique symbol;
}
declare class TASKS {
    static readonly MakeOpenOrder: unique symbol;
    static readonly CancelOpenOrder: unique symbol;
    static readonly GetBalances: unique symbol;
    static readonly GetClosable: unique symbol;
    static readonly GetPositions: unique symbol;
    static readonly OrderMakes: unique symbol;
    static readonly OrderTakes: unique symbol;
    static readonly TradeTakesOpenMakers: unique symbol;
    static readonly ValidateOrder: unique symbol;
    static readonly OrderVolumes: unique symbol;
    static readonly GetAvailable: unique symbol;
    static readonly MarginAccumulation: unique symbol;
    static readonly Settle: unique symbol;
}
export declare class TYPES {
    static readonly spec: unique symbol;
    static readonly HStatic: unique symbol;
    static readonly TimelineLike: unique symbol;
    static readonly MarketCalc: unique symbol;
    static readonly DataStatic: unique symbol;
    static readonly Context: unique symbol;
    static readonly Models: unique symbol;
    static readonly MODELS: typeof MODELS;
    static readonly Broadcast: unique symbol;
    static readonly Tasks: unique symbol;
    static readonly Mtm: unique symbol;
    static readonly UseCases: unique symbol;
    static readonly USE_CASES: typeof USE_CASES;
    static readonly TASKS: typeof TASKS;
    static readonly Facades: unique symbol;
    static readonly DelayConfig: unique symbol;
    static readonly Instant: unique symbol;
    static readonly Latency: unique symbol;
    static readonly Joystick: unique symbol;
    static readonly UserTex: unique symbol;
    static readonly AdminTex: unique symbol;
    static readonly Texchange: unique symbol;
}
export {};
