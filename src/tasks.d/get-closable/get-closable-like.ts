import {
	Closable,
	HLike,
} from 'secretary-like';

export interface GetClosableLike<H extends HLike<H>> {
	getClosable(): Closable<H>;
}
