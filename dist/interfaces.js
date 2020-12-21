export * from 'interfaces';
export function round(x, precision) {
    return Math.round(x / precision) * precision;
}
export function floor(x, precision) {
    return Math.floor(x / precision) * precision;
}
export function ceil(x, precision) {
    return Math.ceil(x / precision) * precision;
}
//# sourceMappingURL=interfaces.js.map