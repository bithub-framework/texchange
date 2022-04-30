import { HLike, OpenOrder, Trade } from 'interfaces';
import { Context } from '../../context';
import { OrderTakesLike } from './order-takes-like';
import { Broadcast } from '../../broadcast';
import { Margins } from '../../models.d/margins';
import { Assets } from '../../models.d/assets';
import { Progress } from '../../models.d/progress';
import { Book } from '../../models.d/book';
import { OrderVolumesLike } from '../order-volumes/order-volumes-like';
export declare class OrderTakes<H extends HLike<H>> implements OrderTakesLike<H> {
    protected tasks: OrderTakes.TaskDeps<H>;
    protected context: Context<H>;
    protected models: OrderTakes.ModelDeps<H>;
    protected broadcast: Broadcast<H>;
    constructor(tasks: OrderTakes.TaskDeps<H>, context: Context<H>, models: OrderTakes.ModelDeps<H>, broadcast: Broadcast<H>);
    $orderTakes($taker: OpenOrder<H>): Trade<H>[];
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
