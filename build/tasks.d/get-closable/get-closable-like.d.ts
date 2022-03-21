import { Closable, HLike } from 'interfaces';
export interface GetClosableLike<H extends HLike<H>> {
    getClosable(): Closable<H>;
}
