import { HLike, TimelineLike } from 'secretary-like';
import { DataNamespace } from './interfaces/data';
export declare class Context<H extends HLike<H>> {
    timeline: TimelineLike;
    Data: DataNamespace<H>;
    constructor(timeline: TimelineLike, Data: DataNamespace<H>);
}
