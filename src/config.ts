export const PRICE_PRECISION = 1e-2;
export const QUANTITY_PRECISION = 1e-3;
export const DOLLAR_PRECISION = 1e-2;
const LEVERAGE_PRECISION = 1e-3;
const FEE_RATE_PRECISION = 1e-5;

export const EPSILON = .1
    * Math.min(
        PRICE_PRECISION,
        QUANTITY_PRECISION,
        DOLLAR_PRECISION,
        LEVERAGE_PRECISION,
        FEE_RATE_PRECISION,
    );
