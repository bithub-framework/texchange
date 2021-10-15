import Big from "big.js";

export function min(x: Big, y: Big) {
    return x.lt(y) ? x : y;
}

export function max(x: Big, y: Big) {
    return x.gt(y) ? x : y;
}
