class MODELS {
	public static readonly initialBalance = Symbol();
	public static readonly Makers = Symbol();
	public static readonly Assets = Symbol();
	public static readonly Margins = Symbol();
	public static readonly Book = Symbol();
	public static readonly Progress = Symbol();
	public static readonly Pricing = Symbol();
}


class USE_CASES {
	public static readonly MakeOrder = Symbol();
	public static readonly CancelOrder = Symbol();
	public static readonly AmendOrder = Symbol();
	public static readonly GetOpenOrders = Symbol();
	public static readonly GetPositions = Symbol();
	public static readonly GetBalances = Symbol();
	public static readonly UpdateOrderbook = Symbol();
	public static readonly Subscription = Symbol();
	public static readonly GetProgress = Symbol();
	public static readonly UpdateTrades = Symbol();

	public static readonly realTimeSettlement = Symbol();
}

class TASKS {
	public static readonly MakeOpenOrder = Symbol();
	public static readonly CancelOpenOrder = Symbol();
	public static readonly GetBalances = Symbol();
	public static readonly GetClosable = Symbol();
	public static readonly GetPositions = Symbol();
	public static readonly OrderMakes = Symbol();
	public static readonly OrderTakes = Symbol();
	public static readonly TradeTakesOpenMakers = Symbol();
	public static readonly ValidateOrder = Symbol();
	public static readonly OrderVolumes = Symbol();
	public static readonly GetAvailable = Symbol();
	public static readonly MarginAccumulation = Symbol();
	public static readonly Settle = Symbol();
}


export class FACADES {
	public static readonly Admin = Symbol();
	public static readonly UserMarket = Symbol();
	public static readonly Instant = Symbol();
	public static readonly Config = Symbol();
	public static readonly UserAccount = Symbol();
}


export class TYPES {
	public static readonly spec = Symbol();
	public static readonly HStatic = Symbol();
	public static readonly TimelineLike = Symbol();
	public static readonly MarketCalc = Symbol();
	public static readonly DataStatic = Symbol();
	public static readonly Context = Symbol();


	public static readonly Models = Symbol();
	public static readonly MODELS = MODELS;

	public static readonly Broadcast = Symbol();

	public static readonly Tasks = Symbol();

	public static readonly Mtm = Symbol();

	public static readonly UseCases = Symbol();
	public static readonly USE_CASES = USE_CASES;

	public static readonly TASKS = TASKS;

	public static readonly Facades = Symbol();
	public static readonly FACADES = FACADES;

	public static readonly Texchange = Symbol();
}





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
