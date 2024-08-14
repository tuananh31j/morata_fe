import { Navigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import AccountLayout from '~/layouts/AccountLayout';
import MainLayout from '~/layouts/MainLayout/MainLayout';
import ProtectedRouteAuth from '~/layouts/Protected/AuthProtected';
import OrderDetailPage from '~/pages/Clients/Account/MyOrders/OrderDetail/OrderDetailPage';
import { CheckEmail } from '~/pages/Clients/AuthPage/Email/CheckEmail';
import { VerifyPage } from '~/pages/Clients/AuthPage/Email/Verify';
import ForgotPassword from '~/pages/Clients/AuthPage/ForgotPassword/ForgotPassword';
import ResetPassword from '~/pages/Clients/AuthPage/ForgotPassword/ResetPassword';
import Success from '~/pages/Clients/Order/Success';
import {
    AboutPage,
    AuthLayoutPage,
    CheckoutDetailsPage,
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
                path: MAIN_ROUTES.ABOUT,
                element: (
                    <Suspense>
                        <AboutPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.PRODUCTS,
                element: (
                    <Suspense>
                        <ProductsPage />
                    </Suspense>
                ),
            },
            {
                path: `${MAIN_ROUTES.PRODUCTS}/:id`,
                element: (
                    <Suspense>
                        <ProductDetailsPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.WISH_LIST,
                element: (
                    <Suspense>
                        <WishlistPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKOUT,
                element: (
                    <Suspense>
                        <ProtectedRouteAuth>
                            <CheckoutPage />
                        </ProtectedRouteAuth>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKOUT_DETAILS,
                element: (
                    <Suspense>
                        <ProtectedRouteAuth>
                            <CheckoutDetailsPage />
                        </ProtectedRouteAuth>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CONTACT,
                element: (
                    <Suspense>
                        <ContactPage />
                    </Suspense>
                ),
            },

            // @Account
            {
                element: (
                    <Suspense>
                        <AccountLayout />
                    </Suspense>
                ),
                children: [
                    { path: MAIN_ROUTES.PROFILE, element: <ProfilePage /> },
                    { path: MAIN_ROUTES.MY_ORDERS, element: <MyOrdersPage /> },
                    { path: MAIN_ROUTES.MY_ORDERS_DETAIL, element: <OrderDetailPage /> },
                    { path: MAIN_ROUTES.MY_ADDRESS, element: <MyAddressPage /> },
                ],
            },
            {
                path: MAIN_ROUTES.VERIFY,
                element: (
                    <Suspense>
                        <VerifyPage />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKEMAIL,
                element: (
                    <Suspense>
                        <CheckEmail />
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.FORGOT_PASSWORD,
                element: (
                    <Suspense>
                        <ProtectedRouteAuth>
                            <ForgotPassword />
                        </ProtectedRouteAuth>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.RESET_PASSWORD,
                element: (
                    <Suspense>
                        <ProtectedRouteAuth>
                            <ResetPassword />
                        </ProtectedRouteAuth>
                    </Suspense>
                ),
            },
            // @Auth
            {
                element: (
                    <Suspense>
                        <ProtectedRouteAuth>
                            <AuthLayoutPage />
                        </ProtectedRouteAuth>
                    </Suspense>
                ),
                children: [
                    { path: MAIN_ROUTES.LOGIN, element: <LoginPage /> },
                    { path: MAIN_ROUTES.REGISTER, element: <RegisterPage /> },
                ],
            },
        ],
    },
    { path: '*', element: <Navigate to={MAIN_ROUTES.NOT_FOUND} /> },
    { path: MAIN_ROUTES.SUCCESS_ORDER, element: <Success /> },
    { path: MAIN_ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];

export default PublicRoutes;
