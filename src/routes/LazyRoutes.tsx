import React, { lazy } from 'react';
import Loading from '~/components/_common/Loading/Loading';

// @Page
export const DashboardPage = lazy(() => import('~/pages/Admins/Dashboard'));
export const AboutPage = lazy(() => import('~/pages/Clients/About'));
export const HomePage = lazy(() => import('~/pages/Clients/Home'));
export const ProductsPage = lazy(() => import('~/pages/Clients/Products'));
export const ProductDetailsPage = lazy(() => import('~/pages/Clients/ProductDetails'));
export const WishlistPage = lazy(() => import('~/pages/Clients/WishList'));
export const CheckoutPage = lazy(() => import('~/pages/Clients/Checkout'));
export const AccountLayoutPage = lazy(() => import('~/layouts/AccountLayout'));
export const MyOrdersPage = lazy(() => import('~/pages/Clients/Account/MyOrders'));
export const MyAddressPage = lazy(() => import('~/pages/Clients/Account/MyAddress'));
export const ProfilePage = lazy(() => import('~/pages/Clients/Account/Profile'));
export const LoginPage = lazy(() => import('~/pages/Clients/AuthPage/Login'));
export const RegisterPage = lazy(() => import('~/pages/Clients/AuthPage/Register'));
export const AuthLayoutPage = lazy(() => import('~/layouts/AuthLayout'));
export const NotFoundPage = lazy(() => import('~/pages/404'));
export const ErrorPage = lazy(() => import('~/pages/Error'));
export const ProductsList = lazy(() => import('~/pages/Admins/Product/index'));
export const CreateProduct = lazy(() => import('~/pages/Admins/Product/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admins/Product/UpdateProduct'));
export const AdminProductDetail = lazy(() => import('~/pages/Admins/Product/ProductDetail'));
export const ManageUsers = lazy(() => import('~/pages/Admins/User/index'));
export const CreateUser = lazy(() => import('~/pages/Admins/User/CreateUser'));
export const UpdateUser = lazy(() => import('~/pages/Admins/User/UpdateUser'));
export const ContactPage = lazy(() => import('~/pages/Clients/Contact'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};
