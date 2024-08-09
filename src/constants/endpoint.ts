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
    UPDATE_VARIATIONS: '/products/variation/',
    CREATE_VARIATIONS: '/products/variation/',
    FILTER: '/products/filter',
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
    SENDMAIL: '/auth/sendVerify',
    SENDRESETPASS: '/auth/sendresetPassword',
    VERIFY: '/auth/verifyEmail',
    RESETPASSWORD: '/auth/resetpassword',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
};

export const CHECKOUT_ENDPOINT = {
    ORDERS: '/orders',
    VNPAY: '/create-checkout-with-vnpay',
    SESSION: '/create-checkout-session',
};

export const ORDER_ENDPOINT = {
    GET_ALL_ORDERS: '/orders',
    MY_ORDERS: '/orders/user',
    VNPAY_RETURN: '/vnpay-return',
    CANCEL_ORDER: '/orders/cancel',
    CONFIRM_ORDER: '/orders/confirm',
    FINISH_ORDER: '/orders/done',
    UPDATE_ISREVIEWED: '/orders',
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
    DATE_RANGE: 'stats/dateRange',
    PRODUCTS: '/stats/productStats',
    TOP_BUYERS: '/stats/topBuyers',
};

export const USER_ENDPOINT = {
    PROFILE: '/users/private',
    ALL: '/users/all',
    UPDATE: '/users/private',
    UPDATE_ADMIN: '/users',
    DETAIL: '/users',
};
export const REVIEW_ENDPOINT = {
    GETOFPRODUCT: '/reviews',
    GET_DETAIL: '/reviews',
    CREATE: '/reviews',
    CHECK_PURCHASED: '/reviews/purchased',
    UPDATE_ISREVIEWED: '/reviews/',
};
export const LOCATION_ENDPOINT = {
    ROOT: '/locations',
    USER: '/locations/user',
};
