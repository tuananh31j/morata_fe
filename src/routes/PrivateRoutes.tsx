import PrivateLayout from '~/layouts/PrivateLayout';
import { CreateProduct, DashboardPage, ProductsList, Suspense } from './LazyRoutes';

const PrivateRoutes = [
    {
        path: '/admin',
        element: <PrivateLayout />,
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
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: 'products',
                children: [
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ProductsList />
                            </Suspense>
                        ),
                    },
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsList />
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
                        path: 'edit',
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default PrivateRoutes;
