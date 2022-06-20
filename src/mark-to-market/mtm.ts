import { Startable, StartableLike } from 'startable';
import { Context } from '../context';
import { Broadcast } from '../broadcast';
import { HLike } from 'secretary-like';


export abstract class Mtm<H extends HLike<H>> implements StartableLike {
    protected abstract rawStart(): Promise<void>;
    protected abstract rawStop(): Promise<void>;
    private startable = Startable.create(
        () => this.rawStart(),
        () => this.rawStop(),
    );
    public start = this.startable.start;
    public stop = this.startable.stop;
    public assart = this.startable.assart;
    public starp = this.startable.starp;
    public getReadyState = this.startable.getReadyState;
    public skipStart = this.startable.skipStart;
}

export namespace Mtm {
    export interface ModelDeps<H extends HLike<H>> { }
    export interface TaskDeps<H extends HLike<H>> { }
}
