import { TexchangeOpenOrder, TexchangeTrade, HLike } from 'interfaces';
import { Context } from '../../context/context';
import { OrderTakesLike } from './order-takes-like';
import { Broadcast } from '../../broadcast';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
import { Progress } from '../../models.d/progress';
import { Book } from '../../models.d/book';
import { OrderVolumesLike } from '../order-volumes/order-volumes-like';
export declare class OrderTakes<H extends HLike<H>> implements OrderTakesLike<H> {
    protected readonly context: Context<H>;
    protected readonly models: OrderTakes.ModelDeps<H>;
    protected readonly broadcast: Broadcast<H>;
    protected readonly tasks: OrderTakes.TaskDeps<H>;
    constructor(context: Context<H>, models: OrderTakes.ModelDeps<H>, broadcast: Broadcast<H>, tasks: OrderTakes.TaskDeps<H>);
    /**
     * @param taker variable
     */
    orderTakes(taker: TexchangeOpenOrder.MutablePlain<H>): TexchangeTrade.MutablePlain<H>[];
}
export declare namespace OrderTakes {
    interface ModelDeps<H extends HLike<H>> {
        margins: Margins<H>;
        assets: Assets<H>;
        progress: Progress<H>;
        book: Book<H>;
    }
    interface TaskDeps<H extends HLike<H>> {
        orderVolumes: OrderVolumesLike<H>;
    }
}
