import { Orderbook, DatabaseTrade } from '../interfaces';
import { type Hub } from '../hub';
interface Deps extends Pick<Hub, 'context' | 'models' | 'presenters'> {
    views: Pick<Hub['views'], 'instant'>;
}
export declare class Joystick {
    private hub;
    constructor(hub: Deps);
    updateTrades(trades: readonly Readonly<DatabaseTrade>[]): void;
    updateOrderbook(orderbook: Readonly<Orderbook>): void;
}
export {};
