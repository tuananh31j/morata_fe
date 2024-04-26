import About from './pages/Clients/About';
import Dashboard from './pages/Admins/Dashboard';
import Home from './pages/Clients/Home';
import Products from './pages/Clients/Products';
import ProductDetails from './pages/Clients/ProductDetails';

export const ClientRoutes = [
    { PATH: '', ELEMENT: Home },
    { PATH: 'about', ELEMENT: About },
    { PATH: 'products', ELEMENT: Products },
    {PATH: 'productdetail', ELEMENT: ProductDetails}
];

export const AdminRoutes = [{ PATH: '', ELEMENT: Dashboard }];
