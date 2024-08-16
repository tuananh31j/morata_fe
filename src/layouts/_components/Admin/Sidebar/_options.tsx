import {
    BgColorsOutlined,
    CommentOutlined,
    CrownOutlined,
    LineChartOutlined,
    ProductOutlined,
    ProfileOutlined,
    ShoppingOutlined,
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
            { label: 'Create new user', route: ADMIN_ROUTES.USERS_CREATE },

            { label: 'Chat management', route: 'orders/test' },
            { label: 'Review management', route: ADMIN_ROUTES.PRODUCTS_CREATE },
        ],
    },
    // {
    //     icon: <ShopOutlined />,
    //     label: 'Shop',
    //     children: [
    //         { label: 'Shop information', route: ADMIN_ROUTES.SHOP },
    //         { label: 'Shop settings', route: ADMIN_ROUTES.SHOP_SETTINGS },
    //     ],
    // },
    {
        icon: <ProductOutlined />,
        label: 'Quản lý danh mục',
        children: [
            { label: 'Tất cả danh mục', route: ADMIN_ROUTES.CATEGORIES },
            { label: 'Thêm mới danh mục', route: ADMIN_ROUTES.CATEGORIES_CREATE },
        ],
    },
    {
        icon: <BgColorsOutlined />,
        label: 'Quản lý thuộc tính',
        children: [
            { label: 'Tất cả thuộc tính', route: ADMIN_ROUTES.ATTRIBUTES },
            { label: 'Thêm mới thuộc tính', route: ADMIN_ROUTES.ATTRIBUTES_CREATE },
        ],
    },
    {
        icon: <CrownOutlined />,
        label: 'Quản lý thương hiệu',
        children: [
            { label: 'Tất cả thương hiệu', route: ADMIN_ROUTES.BRANDS },
            { label: 'Thêm mới thương hiệu', route: ADMIN_ROUTES.BRAND_CREATE },
        ],
    },
];
