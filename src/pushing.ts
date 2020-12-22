import { EventEmitter } from 'events';
import { IncrementalBook } from './incremental-book';
import {
    Orderbook,
    Trade,
    BID, ASK,
    RawTrade,
} from './interfaces';
import Big from 'big.js';

class Pushing extends EventEmitter {
    protected tradeCount = 0;
    protected incBook = new IncrementalBook();

    constructor(
        // 必须保证 update 时数据的 time 等于 now()
        protected now: () => number,
    ) {
        super();
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        this.pushRawTrades(rawTrades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.incBook.setBaseBook(orderbook);
        this.incBook.apply();
        this.pushOrderbook();
    }

    protected latestOrderbook(): Orderbook {
        return {
            [ASK]: [...this.incBook.getQuantity(ASK)]
                .map(([_price, quantity]) => ({
                    price: new Big(_price), quantity, side: ASK,
                })),
            [BID]: [...this.incBook.getQuantity(BID)]
                .map(([_price, quantity]) => ({
                    price: new Big(_price), quantity, side: BID,
                })),
            time: this.now(),
        };
    }

    protected async pushOrderbook(): Promise<void> {
        const orderbook = this.latestOrderbook();
        this.emit('orderbook', orderbook);
    }

    protected rawTrade2Trade(rawTrades: RawTrade[]): Trade[] {
        return rawTrades.map(rawTrade => ({
            ...rawTrade,
            id: ++this.tradeCount,
        }));
    }

    protected async pushRawTrades(rawTrades: RawTrade[]): Promise<void> {
        const trades = this.rawTrade2Trade(rawTrades);
        this.emit('trades', trades);
    }
}

export {
    Pushing as default,
    Pushing,
}
