import { HLike, TimelineLike } from 'secretary-like';
import { DataStatic } from './interfaces/data';
export declare class Context<H extends HLike<H>> {
    timeline: TimelineLike;
    Data: DataStatic<H>;
    constructor(timeline: TimelineLike, Data: DataStatic<H>);
}
