import Big from "big.js";

export function min(...a: Big[]) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
