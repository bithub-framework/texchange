import { EventEmitter } from 'events';
import { IncrementalBook } from './incremental-book';
import {
    Orderbook,
    Trade,
    BID, ASK,
    RawTrade,
} from './interfaces';

class Pushing extends EventEmitter {
    protected tradeCount = 0;
    protected incBook = new IncrementalBook();

    constructor(
        protected now: () => number,
    ) {
        super();
    }

    public updateTrades(rawTrades: RawTrade[]): void {
        this.pushRawTrades(rawTrades);
    }

    public updateOrderbook(orderbook: Orderbook): void {
        this.incBook.setBase(orderbook);
        this.incBook.apply();
        this.pushOrderbook();
    }

    protected latestOrderbook(): Orderbook {
        return {
            [ASK]: [...this.incBook.getQuantity(ASK)]
                .map(([price, quantity]) => ({
                    price, quantity, side: ASK,
                })),
            [BID]: [...this.incBook.getQuantity(BID)]
                .map(([price, quantity]) => ({
                    price, quantity, side: BID,
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
