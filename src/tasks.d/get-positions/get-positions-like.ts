import {
	Positions,
	HLike,
} from 'secretary-like';

export interface GetPositionsLike<H extends HLike<H>> {
	getPositions(): Positions<H>;
}
