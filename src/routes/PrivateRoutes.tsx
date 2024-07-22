import AdminLayout from '~/layouts/AdminLayout';
import {
    AdminProductDetail,
    CreateProduct,
    CreateUser,
    DashboardPage,
    ManageUsers,
    ProductsList,
    Suspense,
    UpdateProduct,
    OrdersDetails,
    CategoryList,
    CreateCategory,
    UpdateUser,
    ManageOrders,
    UpdateCategory,
    CreateAttribute,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '~/constants/router';
import path from 'path';

const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            // <ProtectedRouteAuth>
            <AdminLayout />
            // </ProtectedRouteAuth>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: ADMIN_ROUTES.PRODUCTS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.PRODUCTS_CREATE,
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/edit',
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/detail',
                        element: (
                            <Suspense>
                                <AdminProductDetail />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: ADMIN_ROUTES.USERS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManageUsers />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.USERS_CREATE,
                        element: (
                            <Suspense>
                                <CreateUser />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.USERS_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateUser />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: ADMIN_ROUTES.ORDERS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManageOrders />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                        element: (
                            <Suspense>
                                <OrdersDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path: `test`,
                        element: (
                            <Suspense>
                                <ManageOrders />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: ADMIN_ROUTES.CATEGORIES,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <CategoryList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_CREATE,
                        element: (
                            <Suspense>
                                <CreateCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_EDIT,
                        element: (
                            <Suspense>
                                <UpdateCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_ATTRIBUTES,
                        element: (
                            <Suspense>
                                <CreateAttribute />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default PrivateRoutes;
