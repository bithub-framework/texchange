import { EventEmitter } from 'events';
import { IncrementalBook } from './incremental-book';
import { BID, ASK, } from './interfaces';
class Pushing extends EventEmitter {
    constructor(now) {
        super();
        this.now = now;
        this.tradeCount = 0;
        this.incBook = new IncrementalBook();
    }
    updateTrades(rawTrades) {
        this.pushRawTrades(rawTrades);
    }
    updateOrderbook(orderbook) {
        this.incBook.setBase(orderbook);
        this.incBook.apply();
        this.pushOrderbook();
    }
    latestOrderbook() {
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
    async pushOrderbook() {
        const orderbook = this.latestOrderbook();
        this.emit('orderbook', orderbook);
    }
    rawTrade2Trade(rawTrades) {
        return rawTrades.map(rawTrade => ({
            ...rawTrade,
            id: ++this.tradeCount,
        }));
    }
    async pushRawTrades(rawTrades) {
        const trades = this.rawTrade2Trade(rawTrades);
        this.emit('trades', trades);
    }
}
export { Pushing as default, Pushing, };
//# sourceMappingURL=pushing.js.map