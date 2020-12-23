export * from 'interfaces';
import {
    Side,
    OpenOrder,
} from 'interfaces';
import Big from 'big.js';

export interface DetailedOpenOrder extends OpenOrder {
    frozenFee: Big;
    frozenMargin: Big;
}

export interface RawTrade {
    price: Big;
    quantity: Big;
    side: Side;
    time: number;
}

export interface Config {
    initialBalance: Big;
    leverage: number;

    PING: number;
    PROCESSING: number;
    MAKER_FEE: number;
    TAKER_FEE: number;

    PRICE_DP: number;
    QUANTITY_DP: number;
    CURRENCY_DP: number;

    calcDollarVolume: (
        price: Big,
        quantity: Big,
    ) => Big,
}

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
