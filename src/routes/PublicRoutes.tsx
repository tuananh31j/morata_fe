import { Navigate } from 'react-router-dom';
import AccountLayout from '~/layouts/AccountLayout';
import MainLayout from '~/layouts/MainLayout/MainLayout';
import {
    AboutPage,
    AuthLayoutPage,
    CheckoutPage,
    ContactPage,
    ErrorPage,
    HomePage,
    LoginPage,
    MyAddressPage,
    MyOrdersPage,
    NotFoundPage,
    ProductDetailsPage,
    ProductsPage,
    ProfilePage,
    RegisterPage,
    Suspense,
    WishlistPage,
} from '~/routes/LazyRoutes';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'about',
                element: (
                    <Suspense>
                        <AboutPage />
                    </Suspense>
                ),
            },
            {
                path: 'products',
                element: (
                    <Suspense>
                        <ProductsPage />
                    </Suspense>
                ),
            },
            {
                path: 'products/:id',
                element: (
                    <Suspense>
                        <ProductDetailsPage />
                    </Suspense>
                ),
            },
            {
                path: 'wishlist',
                element: (
                    <Suspense>
                        <WishlistPage />
                    </Suspense>
                ),
            },
            {
                path: 'checkout',
                element: (
                    <Suspense>
                        <CheckoutPage />
                    </Suspense>
                ),
            },
            {
                path: 'contact',
                element: (
                    <Suspense>
                        <ContactPage />
                    </Suspense>
                ),
            },

            {
                path: 'account',
                element: (
                    <Suspense>
                        <AccountLayout />
                    </Suspense>
                ),
                children: [
                    { index: true, element: <ProfilePage /> },
                    { path: 'profile', element: <ProfilePage /> },
                    { path: 'my-orders', element: <MyOrdersPage /> },
                    { path: 'my-address', element: <MyAddressPage /> },
                ],
            },
            {
                path: 'auth',
                element: (
                    <Suspense>
                        <AuthLayoutPage />
                    </Suspense>
                ),
                children: [
                    { index: true, element: <LoginPage /> },
                    { path: 'login', element: <LoginPage /> },
                    { path: 'register', element: <RegisterPage /> },
                ],
            },
        ],
    },
    { path: '*', element: <Navigate to='/404' /> },
    { path: '/404', element: <NotFoundPage /> },
];

export default PublicRoutes;
