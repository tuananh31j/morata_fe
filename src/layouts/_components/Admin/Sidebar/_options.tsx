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
        children: [{ label: 'Business Insights', route: 'orders/test' }],
    },
    {
        icon: <ProfileOutlined />,
        label: 'Order',
        children: [
            { label: 'All', route: 'orders/test' },
            { label: 'Cancellation', route: 'orders/test' },
        ],
    },
    {
        icon: <ShoppingOutlined />,
        label: 'Product',
        children: [
            { label: 'All', route: 'orders/test' },
            { label: 'Create new product', route: '/admin/product/create' },
        ],
    },
    {
        icon: <CommentOutlined />,
        label: 'Customer service',
        children: [
            { label: 'All users', route: 'orders/test' },
            { label: 'Chat management', route: 'orders/test' },
            { label: 'Review management', route: ADMIN_ROUTES.PRODUCTS_CREATE },
            { label: 'Create new user', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    {
        icon: <ShopOutlined />,
        label: 'Shop',
        children: [
            { label: 'Shop information', route: 'orders/test' },
            { label: 'Shop settings', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    {
        icon: <ProductOutlined />,
        label: 'Category',
        children: [{ label: 'Create', route: ADMIN_ROUTES.CATEGORIES_CREATE }],
    },
    {
        icon: <UserOutlined />,
        label: 'User',
        children: [{ label: 'Create', route: ADMIN_ROUTES.USERS_CREATE }],
    },
];
