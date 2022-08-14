import {
	MODELS as BASE_MODELS,
	TYPES as BASE_TYPES,
} from '../types';


export class MODELS extends BASE_MODELS {
	public static readonly initialSettlementPrice = Symbol('initialSettlementPrice');
}

export class TYPES extends BASE_TYPES {
	public static readonly MODELS = MODELS;
}
