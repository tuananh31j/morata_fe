export const PRODUCT_ENDPOINT = {
    PRODUCT: '/products',
    ALL: '/products/all',
    ALL_ADMIN: '/products/portal/all',
    LATEST: '/products/latest',
    BYCATE: '/products/bycate',
    DEALS: '/products/deals',
    REVIEWS: '/products/reviews',
    RELATED: '/products/related',
    CREATE: '/products',
    DELETE: '/products',
    UPDATE: '/products',
};
export const CATEGORY_ENDPOINT = {
    ALL: '/categories/all',
    POPULAR: '/categories/popular',
    CREATE: '/categories',
    DETAIL: '/categories',
    UPDATE: '/categories',
};
export const CART_ENDPOINT = {
    GET: '/carts',
    ADDCART: '/carts/add',
    UPDATEQUANTITY: '/carts/update_quantity',
    REMOVEITEM: '/carts/remove',
};
export const BRAND_ENDPOINT = {
    ALL: '/brands/all',
    DETAIL: '/brands',
};

export const AUTH_ENDPOINT = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
};

export const CHECKOUT_ENDPOINT = {
    ORDERS: '/orders',
    VNPAY: '/create-checkout-with-vnpay',
    SESSION: '/create-checkout-session',
};

export const ORDER_ENDPOINT = {
    ROOT: '/orders',
    MY_ORDERS: '/orders/user',
    VNPAY_RETURN: '/vnpay-return',
    CANCELED: '/orders/cancel',
    CONFIRM: '/orders/confirm',
    DONE: '/orders/done',
};

export const ATTRIBUTES_ENDPOINT = {
    ALL: '/attributes',
    All: '/attributes/all',
    CREATE: 'attributes',
};

export const STATS_ENDPOINT = {
    TOTAL: '/stats/total',
    DAILY_STATS: '/stats/daily',
    MONTHLY_STATS: '/stats/monthly',
    YEARLY_STATS: '/stats/yearly',
};

export const USER_ENDPOINT = {
    PROFILE: '/users/private',
    UPDATE: '/users/priavte',
};
export const REVIEW_ENDPOINT = {
    GETOFPRODUCT: '/reviews',
};
