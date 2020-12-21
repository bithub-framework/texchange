import { Orderbook, Side } from './interfaces';
declare class IncrementalBook {
    private baseBook;
    private total;
    private increment;
    setBaseBook(orderbook: Orderbook): void;
    incQuantity(side: Side, price: number, increment: number): void;
    getQuantity(side: Side): Map<number, number>;
    apply(): void;
}
export { IncrementalBook as default, IncrementalBook, };
