import React, { lazy } from 'react';
import Loading from '~/components/_common/Loading/Loading';

// @client page
export const AboutPage = lazy(() => import('~/pages/Clients/About'));
export const HomePage = lazy(() => import('~/pages/Clients/Home'));
export const ProductsPage = lazy(() => import('~/pages/Clients/Products'));
export const ProductDetailsPage = lazy(() => import('~/pages/Clients/ProductDetails'));
export const WishlistPage = lazy(() => import('~/pages/Clients/WishList'));
export const SHippingPage = lazy(() => import('~/pages/Clients/Checkout/Shipping'));
export const AccountLayoutPage = lazy(() => import('~/layouts/AccountLayout'));
export const MyOrdersPage = lazy(() => import('~/pages/Clients/Account/MyOrders'));
export const MyAddressPage = lazy(() => import('~/pages/Clients/Account/MyAddress'));
export const ProfilePage = lazy(() => import('~/pages/Clients/Account/Profile'));
export const LoginPage = lazy(() => import('~/pages/Clients/AuthPage/Login'));
export const RegisterPage = lazy(() => import('~/pages/Clients/AuthPage/Register'));
export const AuthLayoutPage = lazy(() => import('~/layouts/AuthLayout'));
export const ContactPage = lazy(() => import('~/pages/Clients/Contact'));
export const CheckoutPage = lazy(() => import('~/pages/Clients/Checkout/Checkout'));

// @admin page
export const DashboardPage = lazy(() => import('~/pages/Admins/_dashboard_'));
export const NotFoundPage = lazy(() => import('~/pages/404'));
export const ErrorPage = lazy(() => import('~/pages/Error'));
export const ManageProducts = lazy(() => import('~/pages/Admins/_product_/index'));
export const ProductsListAll = lazy(() => import('~/pages/Admins/_product_/_component/ProductList/ListAll'));
export const CreateProduct = lazy(() => import('~/pages/Admins/_product_/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admins/_product_/UpdateProduct'));
export const AdminProductDetail = lazy(() => import('~/pages/Admins/_product_/ProductDetail'));
export const ManageUsers = lazy(() => import('~/pages/Admins/_user_/index'));
export const CreateUser = lazy(() => import('~/pages/Admins/_user_/CreateUser'));
export const UpdateUser = lazy(() => import('~/pages/Admins/_user_/UpdateUser'));
export const ManageOrders = lazy(() => import('~/pages/Admins/_order_/ManageOrder'));
export const OrdersDetails = lazy(() => import('~/pages/Admins/_order_/OrderDetails'));
export const CategoryList = lazy(() => import('~/pages/Admins/_category_'));
export const CreateCategory = lazy(() => import('~/pages/Admins/_category_/CreateCategory'));
export const UpdateCategory = lazy(() => import('~/pages/Admins/_category_/UpdateCategory'));
export const CreateAttribute = lazy(() => import('~/pages/Admins/_category_/CreateAttribute'));
export const RedirectToProductList = lazy(
    () => import('~/components/_common/RedirectToProductList/RedirectToProductList')
);

// @suspense
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};
