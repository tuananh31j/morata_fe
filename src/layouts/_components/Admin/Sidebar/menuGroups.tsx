import { AppstoreOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { ADMIN_ROUTES } from '~/constants/router';

export type IMenuItem = {
    icon: JSX.Element;
    label: string;
    route: string;
    children?: Omit<IMenuItem, 'icon'>[];
};

export type IMenuGroups = {
    name: string;
    menuItems: IMenuItem[];
}[];

export const menuGroups = [
    {
        name: 'SYSTEMS',
        menuItems: [
            {
                icon: <AppstoreOutlined />,
                label: 'Dashboard',
                route: ADMIN_ROUTES.DASHBOARD,
            },
            {
                icon: <ProductOutlined />,
                label: 'Order',
                route: ADMIN_ROUTES.ORDERS,
            },
            {
                icon: <ProductOutlined />,
                label: 'Product',
                route: ADMIN_ROUTES.PRODUCTS,
                children: [{ label: 'Create', route: ADMIN_ROUTES.PRODUCTS_CREATE }],
            },
            {
                icon: <ProductOutlined />,
                label: 'Category',
                route: ADMIN_ROUTES.CATEGORIES,
                children: [{ label: 'Create', route: ADMIN_ROUTES.CATEGORIES_CREATE }],
            },
            {
                icon: <UserOutlined />,
                label: 'User',
                route: ADMIN_ROUTES.USERS,
                children: [{ label: 'Create', route: ADMIN_ROUTES.USERS_CREATE }],
            },
        ],
    },
    // {
    //     name: 'OTHERS',
    //     menuItems: [
    //         {
    //             icon: <ProfileOutlined />,
    //             label: 'Footer',
    //             route: '/',
    //         },
    //         {
    //             icon: <ProfileOutlined />,
    //             label: 'Header',
    //             route: '#',
    //         },
    //     ],
    // },
];
