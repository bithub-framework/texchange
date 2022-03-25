import { Context } from '../context/context';
import {
    HLike,
} from 'interfaces';
import { StatefulLike } from 'startable';


export class Progress<H extends HLike<H>>
    implements StatefulLike<Progress.Snapshot> {

    public userTradeCount = 0;
    public userOrderCount = 0;

    public constructor(
        private context: Context<H>,
    ) { }

    public capture(): Progress.Snapshot {
        return {
            userTradeCount: this.userTradeCount,
            userOrderCount: this.userOrderCount,
        };
    }

    public restore(snapshot: Progress.Snapshot): void {
        this.userTradeCount = snapshot.userTradeCount;
        this.userOrderCount = snapshot.userOrderCount;
    }
}

export namespace Progress {
    export interface Snapshot {
        userTradeCount: number;
        userOrderCount: number;
    }
}
