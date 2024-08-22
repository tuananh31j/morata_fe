import { Navigate } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import AccountLayout from '~/layouts/AccountLayout';
import MainLayout from '~/layouts/MainLayout/MainLayout';
import AuthProtected from '~/layouts/Protected/AuthProtected';
import ProtectedSelf from '~/layouts/Protected/ProtectedSelf';
import WrapCartRemoveItem from '~/layouts/Protected/WrapCartRemoveItem';
import OrderDetailPage from '~/pages/Clients/Account/MyOrders/OrderDetail/OrderDetailPage';
import { CheckEmail } from '~/pages/Clients/AuthPage/Email/CheckEmail';
import { VerifyPage } from '~/pages/Clients/AuthPage/Email/Verify';
import ForgotPassword from '~/pages/Clients/AuthPage/ForgotPassword/ForgotPassword';
import ResetPassword from '~/pages/Clients/AuthPage/ForgotPassword/ResetPassword';
import Success from '~/pages/Clients/Order/Success';
import {
    AboutPage,
    AuthLayoutPage,
    CartDetail,
    ShippingPage,
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
    CheckoutPage,
} from '~/routes/LazyRoutes';

const PublicRoutes = [
    {
        path: '/',
        element: (
            <WrapCartRemoveItem>
                <MainLayout />
            </WrapCartRemoveItem>
        ),
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
                path: MAIN_ROUTES.SHIPPING,
                element: (
                    <Suspense>
                        <ProtectedSelf>
                            <ShippingPage />
                        </ProtectedSelf>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.CHECKOUT,
                element: (
                    <Suspense>
                        <ProtectedSelf>
                            <CheckoutPage />
                        </ProtectedSelf>
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
                        <AuthProtected>
                            <AccountLayout />
                        </AuthProtected>
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
                        <AuthProtected>
                            <VerifyPage />
                        </AuthProtected>
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
                        <AuthProtected>
                            <ForgotPassword />
                        </AuthProtected>
                    </Suspense>
                ),
            },
            {
                path: MAIN_ROUTES.RESET_PASSWORD,
                element: (
                    <Suspense>
                        <ResetPassword />
                    </Suspense>
                ),
            },
            // @Auth
            {
                element: (
                    <Suspense>
                        <AuthProtected>
                            <AuthLayoutPage />
                        </AuthProtected>
                    </Suspense>
                ),
                children: [
                    { path: MAIN_ROUTES.LOGIN, element: <LoginPage /> },
                    { path: MAIN_ROUTES.REGISTER, element: <RegisterPage /> },
                ],
            },
            // @Cart
            {
                path: MAIN_ROUTES.CART,
                element: (
                    <Suspense>
                        <CartDetail />
                    </Suspense>
                ),
            },
        ],
    },
    { path: '*', element: <Navigate to={MAIN_ROUTES.NOT_FOUND} /> },
    {
        path: MAIN_ROUTES.SUCCESS_ORDER,
        element: (
            <AuthProtected>
                <Success />
            </AuthProtected>
        ),
    },
    { path: MAIN_ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];

export default PublicRoutes;
