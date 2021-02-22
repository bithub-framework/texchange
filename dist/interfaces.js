export * from 'interfaces';
import { Length, } from 'interfaces';
export function min(...a) {
    return a.reduce((m, x) => m.lt(x) ? m : x);
}
//# sourceMappingURL=interfaces.js.map