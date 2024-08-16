export const MAIN_ROUTES = {
    ABOUT: '/about',
    PRODUCTS: '/products',
    WISH_LIST: '/wishlist',
    SHIPPING: '/shipping',
    CHECKOUT: '/checkout',
    CONTACT: '/contact',
    PROFILE: '/profile',
    MY_ORDERS: '/my-orders',
    MY_ORDERS_DETAIL: '/my-orders/:id',
    MY_ADDRESS: '/my-address',
    LOGIN: '/login',
    VERIFY: '/verifyAccount/:token',
    REGISTER: '/register',
    CHECKEMAIL: '/checkEmail',
    FORGOT_PASSWORD: '/forgotPassword',
    RESET_PASSWORD: '/resetPassword/:token',
    NOT_FOUND: '/404',
    SUCCESS_ORDER: '/success',
    VERIFY_ORDER: '/verify-order',
    WISHLIST: '/wish-list',
    CART: '/cart',
};

export const ADMIN_ROUTES = {
    DASHBOARD: '/admin',
    PRODUCTS: '/admin/products',
    PRODUCTS_LIST: '/admin/products/list',
    PRODUCTS_CREATE: '/admin/products/create',
    PRODUCTS_EDIT: '/admin/products/edit', // @id

    USERS: '/admin/users',
    USERS_CREATE: '/admin/users/create',
    USERS_CHATS: '/admin/users/chats',
    USERS_REVIEWS: '/admin/users/reviews',
    USERS_EDIT: '/admin/users/edit', // @id

    ORDERS: '/admin/orders',
    ORDERS_LIST: '/admin/orders/list',
    ORDERS_CANCELLATION: '/admin/orders/cancellation',

    CATEGORIES: '/admin/categories',
    CATEGORIES_CREATE: '/admin/categories/create',
    CATEGORIES_EDIT: '/admin/categories/edit/:id', // @id
    CATEGORIES_ATTRIBUTES: '/admin/categories/attributes',

    // SHOP
    SHOP: '/admin/shop',
    SHOP_SETTINGS: '/admin/shop',
};
