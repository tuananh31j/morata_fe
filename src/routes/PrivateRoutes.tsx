import AdminLayout from '~/layouts/AdminLayout';
import {
    CreateProduct,
    CreateUser,
    DashboardPage,
    ManageUsers,
    Suspense,
    UpdateProduct,
    OrdersDetails,
    ProductsListAll,
    CategoryList,
    CreateCategory,
    UpdateUser,
    ManageOrders,
    UpdateCategory,
    BrandList,
    CreateBrand,
    UpdateBrand,
    AttributesList,
    CreateAttribute,
    UpdateAttribute,
    ManageReviews,
    ManageReviewsReport,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '~/constants/router';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '~/layouts/Protected/ProtectedRoute';

const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
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
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',

                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
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
                path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                element: (
                    <Suspense>
                        <OrdersDetails />
                    </Suspense>
                ),
            },
            {
                path: ADMIN_ROUTES.ORDERS,
                element: (
                    <Suspense>
                        <ManageOrders />
                    </Suspense>
                ),
            },

            // @Category
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
                        path: `${ADMIN_ROUTES.CATEGORIES_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateCategory />
                            </Suspense>
                        ),
                    },
                ],
            },

            // @Attribute
            {
                path: ADMIN_ROUTES.ATTRIBUTES,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <AttributesList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.ATTRIBUTES_CREATE,
                        element: (
                            <Suspense>
                                <CreateAttribute />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.ATTRIBUTES_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateAttribute />
                            </Suspense>
                        ),
                    },
                ],
            },

            // @Brand
            {
                path: ADMIN_ROUTES.BRANDS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <BrandList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.BRAND_CREATE,
                        element: (
                            <Suspense>
                                <CreateBrand />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.BRAND_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateBrand />
                            </Suspense>
                        ),
                    },
                ],
            },
            // @Review
            {
                path: ADMIN_ROUTES.REVIEWS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManageReviews />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.REVIEWS_REPORT}`,
                        element: (
                            <Suspense>
                                <ManageReviewsReport />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default PrivateRoutes;
