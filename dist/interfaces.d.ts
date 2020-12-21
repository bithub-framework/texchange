export * from 'interfaces';
import { Side, Assets } from 'interfaces';
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
export declare function round(x: number, precision: number): number;
export declare function floor(x: number, precision: number): number;
export declare function ceil(x: number, precision: number): number;
