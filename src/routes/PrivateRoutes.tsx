import AdminLayout from '~/layouts/AdminLayout';
import ProtectedRouteAuth from '~/layouts/Protected/AuthProtected';
import {
    ManageUsers,
    CreateProduct,
    ProductsList,
    Suspense,
    CreateUser,
    UpdateUser,
    DashboardPage,
    UpdateProduct,
    AdminProductDetail,
    OrdersDetail,
    CategoryList,
    CreateCategory,
} from './LazyRoutes';
import ManageOrders from '~/pages/Admins/Order/ManageOrders';
import { ADMIN_ROUTES } from '~/constants/router';

const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            <ProtectedRouteAuth>
                <AdminLayout />
            </ProtectedRouteAuth>
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
                                <ProductsList />,
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
                        path: `${ADMIN_ROUTES.PRODUCTS_EDIT}/:id`, // @id
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.PRODUCTS}/:id`, // @id
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
                                <ManageUsers />,
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
                                <ManageOrders />,
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES}/:id`,
                        element: (
                            <Suspense>
                                <OrdersDetail />
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
                ],
            },
        ],
    },
];

export default PrivateRoutes;
