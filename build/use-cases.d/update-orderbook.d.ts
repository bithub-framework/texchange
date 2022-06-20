import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';
import { DatabaseOrderbook } from '../interfaces/database-orderbook';
import { Book } from '../models.d/book';
import { Progress } from '../models.d/progress';
export declare class UseCaseUpdateOrderbook<H extends HLike<H>> {
    protected context: Context<H>;
    private book;
    private progress;
    protected broadcast: Broadcast<H>;
    constructor(context: Context<H>, book: Book<H>, progress: Progress<H>, broadcast: Broadcast<H>);
    updateOrderbook(orderbook: DatabaseOrderbook<H>): void;
}
