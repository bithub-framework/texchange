import { HLike } from 'interfaces';

export function min<H extends HLike<H>>(x: H, y: H) {
    return x.lt(y) ? x : y;
}

export function max<H extends HLike<H>>(x: H, y: H) {
    return x.gt(y) ? x : y;
}
