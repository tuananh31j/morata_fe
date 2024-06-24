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
    UpdateUser,
} from './LazyRoutes';

const PrivateRoutes = [
    {
        path: '/admin',
        element: (
            // <ProtectedRouteAuth>
            <AdminLayout />
            // </ProtectedRouteAuth>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />,
                    </Suspense>
                ),
            },
            {
                path: 'products',
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
                        path: 'list',
                        element: (
                            <Suspense>
                                <ProductsList />,
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
                path: 'user',
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
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateUser />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit',
                        element: (
                            <Suspense>
                                <UpdateUser />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default PrivateRoutes;
