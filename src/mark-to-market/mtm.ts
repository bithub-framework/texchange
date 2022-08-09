import { createStartable } from 'startable';
import { HLike } from 'secretary-like';


export abstract class Mtm<H extends HLike<H>> {
    protected abstract rawStart(): Promise<void>;
    protected abstract rawStop(): Promise<void>;
    public $s = createStartable(
        () => this.rawStart(),
        () => this.rawStop(),
    );
}

export namespace Mtm {
    export interface ModelDeps<H extends HLike<H>> { }
    export interface TaskDeps<H extends HLike<H>> { }
}
