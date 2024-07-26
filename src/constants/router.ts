export const MAIN_ROUTES = {
    ABOUT: '/about',
    PRODUCTS: '/products',
    WISH_LIST: '/wishlist',
    CHECKOUT: '/checkout',
    CONTACT: '/contact',
    PROFILE: '/profile',
    MY_ORDERS: '/my-orders',
    MY_ADDRESS: '/my-address',
    LOGIN: '/login',
    REGISTER: '/register',

    NOT_FOUND: '/404',
    SUCCESS_ORDER: '/success',
};

export const ADMIN_ROUTES = {
    DASHBOARD: '/admin',
    PRODUCTS: '/admin/products',
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
