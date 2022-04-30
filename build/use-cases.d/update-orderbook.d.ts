import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { Orderbook, HLike, HStatic } from 'interfaces';
import { Book } from '../models.d/book';
export declare class UpdateOrderbook<H extends HLike<H>> {
    protected context: Context<H>;
    protected models: UpdateOrderbook.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    protected tasks: UpdateOrderbook.TaskDeps<H>;
    constructor(context: Context<H>, models: UpdateOrderbook.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UpdateOrderbook.TaskDeps<H>);
    updateOrderbook(orderbook: DatabaseOrderbook<H>): void;
}
export declare namespace UpdateOrderbook {
    interface ModelDeps<H extends HLike<H>> {
        book: Book<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
    }
}
export interface DatabaseOrderbook<H extends HLike<H>> extends Orderbook<H> {
    id: string;
}
export declare class DatabaseOrderbookStatic<H extends HLike<H>> {
    private H;
    private Orderbook;
    constructor(H: HStatic<H>);
    copy(orderbook: DatabaseOrderbook<H>): DatabaseOrderbook<H>;
}
