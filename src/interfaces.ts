export * from 'interfaces';
import {
    Side,
    Assets,
} from 'interfaces';

export interface RawTrade {
    price: number;
    quantity: number;
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

export function round(x: number, precision: number) {
    return Math.round(x / precision) * precision;
}

export function floor(x: number, precision: number) {
    return Math.floor(x / precision) * precision;
}

export function ceil(x: number, precision: number) {
    return Math.ceil(x / precision) * precision;
}
