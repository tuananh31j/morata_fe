import {
    CommentOutlined,
    LineChartOutlined,
    ProductOutlined,
    ProfileOutlined,
    ShopOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { ADMIN_ROUTES } from '~/constants/router';

export type IChildrenItem = {
    label: string;
    route: string;
};
export type IMenuItem = {
    icon: JSX.Element;
    label: string;
    children: IChildrenItem[];
};

export const menuGroups: IMenuItem[] = [
    {
        icon: <LineChartOutlined />,
        label: 'Data',
        children: [{ label: 'Business Insights', route: '/admin' }],
    },
    {
        icon: <ProfileOutlined />,
        label: 'Order',
        children: [
            { label: 'All', route: ADMIN_ROUTES.ORDERS },
            { label: 'Cancellation', route: ADMIN_ROUTES.ORDERS_CANCELLATION },
        ],
    },
    {
        icon: <ShoppingOutlined />,
        label: 'Product',
        children: [
            { label: 'All', route: ADMIN_ROUTES.PRODUCTS },
            { label: 'Create new product', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    {
        icon: <CommentOutlined />,
        label: 'Customer service',
        children: [
            { label: 'All users', route: ADMIN_ROUTES.USERS },
            { label: 'Chat management', route: 'orders/test' },
            { label: 'Review management', route: ADMIN_ROUTES.PRODUCTS_CREATE },
            { label: 'Create new user', route: ADMIN_ROUTES.USERS_CREATE },
        ],
    },
    {
        icon: <ShopOutlined />,
        label: 'Shop',
        children: [
            { label: 'Shop information', route: ADMIN_ROUTES.SHOP },
            { label: 'Shop settings', route: ADMIN_ROUTES.SHOP_SETTINGS },
        ],
    },
    {
        icon: <ProductOutlined />,
        label: 'Category',
        children: [
            { label: 'All', route: ADMIN_ROUTES.CATEGORIES },
            { label: 'Create', route: ADMIN_ROUTES.CATEGORIES_CREATE },
        ],
    },
];
