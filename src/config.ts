export const PRICE_PRECISION = 1e-2;
export const QUANTITY_PRECISION = 1e-3;
export const COST_PRECISION
    = PRICE_PRECISION
    * QUANTITY_PRECISION;
export const LEVERAGE_PRECISION = 1e-3;
export const FEE_RATE_PRECISION = 1e-5;
export const BALANCE_PRECISION
    = COST_PRECISION
    * Math.min(
        LEVERAGE_PRECISION,
        FEE_RATE_PRECISION,
    );

export const EPSILON = .1
    * BALANCE_PRECISION;
