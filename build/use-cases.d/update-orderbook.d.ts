import { Context } from '../context';
import { UseCase } from '../use-case';
import { Broadcast } from '../broadcast';
import { Orderbook, HLike } from 'interfaces';
import { Book } from '../models.d/book';
export declare class UpdateOrderbook<H extends HLike<H>> extends UseCase<H> {
    protected readonly context: Context<H>;
    protected readonly models: UpdateOrderbook.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: UpdateOrderbook.TaskDeps<H>;
    constructor(context: Context<H>, models: UpdateOrderbook.ModelDeps<H>, broadcast: Broadcast<H>, tasks: UpdateOrderbook.TaskDeps<H>);
    updateOrderbook(orderbook: Orderbook<H>): void;
}
export declare namespace UpdateOrderbook {
    interface ModelDeps<H extends HLike<H>> extends UseCase.ModelDeps<H> {
        book: Book<H>;
    }
    interface TaskDeps<H extends HLike<H>> extends UseCase.TaskDeps<H> {
    }
}
