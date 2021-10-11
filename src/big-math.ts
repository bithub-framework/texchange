import Big from "big.js";

export function min(x: Big, y: Big) {
    return x.lt(y) ? x : y;
}
