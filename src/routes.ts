import { lazy } from 'react';

//@Page
const Dashboard = lazy(() => import('./pages/Admins/Dashboard'));
const About = lazy(() => import('./pages/Clients/About'));
const Home = lazy(() => import('./pages/Clients/Home'));
const Products = lazy(() => import('./pages/Clients/Products'));
const ProductDetails = lazy(() => import('./pages/Clients/ProductDetails'));
const Wishlist = lazy(() => import('./pages/Clients/WishList'));
const Checkout = lazy(() => import('./pages/Clients/Checkout'));
const AccountLayout = lazy(() => import('./layouts/AccountLayout'));
const MyOrders = lazy(() => import('./pages/Clients/Account/MyOrders'));
const MyAddress = lazy(() => import('./pages/Clients/Account/MyAddress'));
const Profile = lazy(() => import('./pages/Clients/Account/Profile'));

//@Router
export const ClientRoutes = [
    { PATH: '', ELEMENT: Home },
    { PATH: 'about', ELEMENT: About },
    { PATH: 'products', ELEMENT: Products },
    { PATH: 'productdetail', ELEMENT: ProductDetails },
    { PATH: 'wishlist', ELEMENT: Wishlist },
    { PATH: 'checkout', ELEMENT: Checkout },
    {
        PATH: 'account',
        ELEMENT: AccountLayout,
        CHILDREN: [
            { PATH: 'profile', ELEMENT: Profile },
            { PATH: 'my-orders', ELEMENT: MyOrders },
            { PATH: 'my-address', ELEMENT: MyAddress },
        ],
    },
];

export const AdminRoutes = [{ PATH: '', ELEMENT: Dashboard }];
