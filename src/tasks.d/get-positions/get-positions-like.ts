import {
	Positions,
	HLike,
} from 'interfaces';

export interface GetPositionsLike<H extends HLike<H>> {
	getPositions(): Positions<H>;
}
