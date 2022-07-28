import { HLike, TimelineLike } from 'secretary-like';
import { DataTypesNamespace } from './data';
export declare class Context<H extends HLike<H>> {
    timeline: TimelineLike;
    dataTypes: DataTypesNamespace<H>;
    constructor(timeline: TimelineLike, dataTypes: DataTypesNamespace<H>);
}
