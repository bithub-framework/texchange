import {
	HLike,
	TimelineLike,
} from 'secretary-like';
import { DataTypesNamespace } from './data-types-namespace';


export interface VirtualMachineContextLike<H extends HLike<H>> {
	timeline: TimelineLike;
	DataTypes: DataTypesNamespace<H>;
}
