import { HLike, TimelineLike } from 'secretary-like';
import { DataTypesNamespace } from './data-types-namespace';
export declare class Context<H extends HLike<H>> {
    timeline: TimelineLike;
    DataTypes: DataTypesNamespace<H>;
    constructor(timeline: TimelineLike, DataTypes: DataTypesNamespace<H>);
}
