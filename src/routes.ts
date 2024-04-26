import Dashboard from './pages/Admins/Dashboard';
import About from './pages/Clients/About';
import Home from './pages/Clients/Home';
import Products from './pages/Clients/Products';
import ProductDetails from './pages/Clients/ProductDetails';
import Wishlist from './pages/Clients/WishList/WishList';

export const ClientRoutes = [
    { PATH: '', ELEMENT: Home },
    { PATH: 'about', ELEMENT: About },
    { PATH: 'products', ELEMENT: Products },
    { PATH: 'productdetail', ELEMENT: ProductDetails },
    { PATH: 'wishlist', ELEMENT: Wishlist },
];

export const AdminRoutes = [{ PATH: '', ELEMENT: Dashboard }];
