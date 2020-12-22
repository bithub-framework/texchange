export * from 'interfaces';
import {
    Side,
    Assets,
} from 'interfaces';
import Big from 'big.js';

export interface RawTrade {
    price: Big;
    quantity: Big;
    side: Side;
    time: number;
}

export interface Config {
    initialAssets: Assets;
    PING: number;
    PROCESSING: number;
    MAKER_FEE: number;
    TAKER_FEE: number;
}

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
