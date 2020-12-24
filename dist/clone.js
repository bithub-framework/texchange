import { clone as copy, reviver, } from 'interfaces';
import { OrderbookManager } from './orderbook-manager';
export function clone(x) {
    if (x instanceof OrderbookManager)
        return JSON.parse(JSON.stringify(x), reviver);
    return copy(x);
}
export default clone;
//# sourceMappingURL=clone.js.map